import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const chatbotApi = axios.create({
  baseURL: `${BACKEND_URL}/api/chatbot`,
  withCredentials: true,
});

/**
 * Parse an SSE line like `data: {...}`. Returns the parsed object or null
 * if the line is not a data payload.
 * @param {string} line - A single line from the SSE stream.
 * @returns {object|null} Parsed payload.
 */
const parseSSELine = (line) => {
  if (!line.startsWith("data:")) return null;
  const data = line.slice(5).trim();
  if (!data || data === "[DONE]") return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * Send a message to the chatbot and consume the server-sent (streamed) response.
 *
 * Events delivered via callbacks:
 *  - onConversationId(conversationId): emitted first when the server assigns one.
 *  - onContent(piece): partial text chunks of the assistant reply.
 *  - onMessage(fullContent): emitted once when the reply is complete.
 *  - onDone(): emitted when the stream ends cleanly.
 *  - onError(message): emitted if the request fails.
 *  - onStatus(code): emitted when the HTTP response status is known.
 *
 * @param {string} message - The user's message.
 * @param {object} [options]
 * @param {string} [options.conversationId] - Optional conversation ID for continuity.
 * @param {string} [options.domain] - Optional domain context (e.g., "general", "teachers").
 * @param {object} [options.callbacks] - Event callbacks (see above).
 * @returns {AbortController} Controller used to abort the request if needed.
 */
export const streamChatMessage = (message, options = {}) => {
  const { conversationId, domain = "general", callbacks = {} } = options;
  const {
    onConversationId,
    onContent,
    onMessage,
    onDone,
    onError,
    onStatus,
  } = callbacks;

  const controller = new AbortController();

  (async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message, conversationId, domain }),
        signal: controller.signal,
      });

      onStatus?.(response.status);

      if (!response.ok) {
        let detail = "Failed to get response from AI.";
        try {
          const errBody = await response.json();
          detail = errBody.error || errBody.message || detail;
        } catch {
          // keep default message
        }
        onError?.(detail);
        onDone?.();
        return;
      }

      if (!response.body) {
        onError?.("Streaming is not supported by this browser.");
        onDone?.();
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // keep incomplete line for next chunk

        for (const line of lines) {
          const parsed = parseSSELine(line);
          if (!parsed) continue;

          if (parsed.conversationId) {
            onConversationId?.(parsed.conversationId);
          }
          if (typeof parsed.content === "string" && parsed.content) {
            fullContent += parsed.content;
            onContent?.(parsed.content);
          }
        }
      }

      onMessage?.(fullContent);
      onDone?.();
    } catch (err) {
      if (err.name === "AbortError") return;
      onError?.(err.message || "Failed to send message.");
      onDone?.();
    }
  })();

  return controller;
};

/**
 * Send a message and receive a complete (non-streaming) response.
 * Simple alternative to streamChatMessage.
 * @param {string} message - The user's message.
 * @param {object} [options]
 * @param {string} [options.conversationId] - Optional conversation ID.
 * @param {string} [options.domain] - Domain context.
 * @returns {Promise<object>} { conversationId, content, timestamp }
 */
export const sendMessage = async (message, options = {}) => {
  const { conversationId, domain = "general" } = options;
  const response = await chatbotApi.post("/chat/sync", {
    message,
    conversationId,
    domain,
  });
  return response.data;
};

/**
 * Check rate limit status for the current IP.
 * @returns {Promise} Axios response with rate limit info.
 */
export const checkRateLimit = async () => {
  const response = await chatbotApi.get("/rate-limit");
  return response.data;
};

/**
 * Fetch the authenticated user's conversation list.
 * Returns lightweight blocks (id, domain, last message, timestamp).
 * @returns {Promise<Array>} Array of conversation block objects.
 */
export const getConversations = async () => {
  const response = await chatbotApi.get("/conversations");
  return response.data.conversations;
};

/**
 * Fetch full message history for a specific conversation.
 * Requires authentication (conversation belongs to the current user).
 * @param {string} conversationId - The conversation ID to fetch.
 * @returns {Promise<object>} { conversationId, domain, messages, updatedAt }
 */
export const getConversationHistory = async (conversationId) => {
  const response = await chatbotApi.get(`/conversations/${conversationId}`);
  return response.data;
};

export default {
  streamChatMessage,
  sendMessage,
  checkRateLimit,
  getConversations,
  getConversationHistory,
};
