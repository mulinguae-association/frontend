import React, { useState, useCallback, useRef } from "react";
import { MessagesSquare, X, Sparkles } from "lucide-react";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import PredefinedSuggestions from "./components/PredefinedSuggestions";
import ConversationsList from "./components/ConversationsList";
import {
  streamChatMessage,
  getConversationHistory,
} from "../../apis/chatbot-api";
import { sanitizeInput, topicToDomain } from "./utils/chatbotUtils";
import useBodyScrollLock from "../../utils/useBodyScrollLock";
import { useAuth } from "../../contexts/AuthContext";
import "./Chatbot.scss";

/**
 * Main Chatbot component.
 * Provides a floating chat interface with message history and streaming support.
 *
 * @param {object} props
 * @param {boolean} [props.initialOpen] - Whether the chatbot starts open.
 * @param {string} [props.domain] - The domain context for AI responses (e.g., "general", "teachers").
 * @param {string} [props.position] - Position of the chat widget ('bottom-right' | 'bottom-left').
 * @param {boolean} [props.showVoice] - Enable voice input capability.
 * @param {boolean} [props.showSuggestions] - Whether to show the predefined suggestion buttons.
 */
const Chatbot = ({
  initialOpen = false,
  domain = "general",
  position = "bottom-right",
  showVoice = false,
  showSuggestions = true,
}) => {
  const { isAuth } = useAuth();

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isLoading, setIsLoading] = useState(false);

  const [chatState, setChatState] = useState({
    view: "chat",
    messages: [],
    conversationId: null,
    activeTopic: domain,
    error: null,
  });

  const abortRef = useRef(null);
  const botMsgIdRef = useRef(null);

  // Lock background scrolling whenever the chat panel is open,
  // on both desktop and mobile.
  useBodyScrollLock(isOpen);

  // Start a fresh chat.
  const startNewChat = useCallback(() => {
    abortRef.current?.abort();

    setChatState({
      view: "chat",
      messages: [],
      conversationId: null,
      activeTopic: domain,
      error: null,
    });

    setIsLoading(false);
  }, [domain]);

  // Open the past-conversations list (authenticated users only).
  const openConversationList = useCallback(() => {
    if (!isAuth) return;

    abortRef.current?.abort();

    setChatState((prev) => ({
      ...prev,
      view: "list",
      error: null,
    }));

    setIsLoading(false);
  }, [isAuth]);

  const handleSendMessage = useCallback(
    async (text, messageDomain = chatState.activeTopic) => {
      const sanitized = sanitizeInput(text);

      if (!sanitized) return;

      // Add user message.
      const userMessage = {
        role: "user",
        content: sanitized,
        timestamp: Date.now(),
        _msgId: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        error: null,
      }));

      setIsLoading(true);

      // Generate a stable bot message ID upfront.
      const botMsgId = `bot-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;

      botMsgIdRef.current = botMsgId;

      const appendBotContent = (piece) => {
        setChatState((prev) => {
          const botIndex = prev.messages.findIndex(
            (message) => message._msgId === botMsgId,
          );

          if (botIndex === -1) {
            // First chunk - add the bot message.
            return {
              ...prev,
              messages: [
                ...prev.messages,
                {
                  role: "assistant",
                  content: piece,
                  timestamp: Date.now(),
                  _msgId: botMsgId,
                },
              ],
            };
          }

          // Subsequent chunks - update existing message.
          return {
            ...prev,
            messages: prev.messages.map((message) =>
              message._msgId === botMsgId
                ? {
                    ...message,
                    content: message.content + piece,
                  }
                : message,
            ),
          };
        });
      };

      const ensureBotContent = (fullContent) => {
        setChatState((prev) => {
          const botIndex = prev.messages.findIndex(
            (message) => message._msgId === botMsgId,
          );

          if (botIndex === -1) {
            // No message yet (e.g. error before any content).
            return {
              ...prev,
              messages: [
                ...prev.messages,
                {
                  role: "assistant",
                  content: fullContent,
                  timestamp: Date.now(),
                  _msgId: botMsgId,
                },
              ],
            };
          }

          return {
            ...prev,
            messages: prev.messages.map((message) =>
              message._msgId === botMsgId
                ? {
                    ...message,
                    content: fullContent,
                  }
                : message,
            ),
          };
        });
      };

      abortRef.current = streamChatMessage(sanitized, {
        conversationId: chatState.conversationId,
        domain: messageDomain,

        callbacks: {
          onConversationId: (id) => {
            setChatState((prev) => ({
              ...prev,
              conversationId: id,
            }));
          },

          onContent: appendBotContent,

          onMessage: (fullContent) => {
            ensureBotContent(fullContent);
            setIsLoading(false);
          },

          onDone: () => {
            setIsLoading(false);
          },

          onError: (msg) => {
            setChatState((prev) => ({
              ...prev,
              error: msg,
            }));

            setIsLoading(false);

            // Only show error message if no content was received yet.
            if (botMsgIdRef.current) {
              ensureBotContent(
                "Sorry, something went wrong. Please try again.",
              );
            }
          },
        },
      });
    },
    [chatState.activeTopic, chatState.conversationId],
  );

  const toggleChat = useCallback(() => {
    if (isOpen) {
      abortRef.current?.abort();
      setIsLoading(false);
    }

    setIsOpen((prev) => !prev);

    setChatState((prev) => ({
      ...prev,
      error: null,
    }));
  }, [isOpen]);

  // Load a past conversation's full history and open it in the chat view.
  const selectConversation = useCallback(async (selectedConversationId) => {
    try {
      setChatState((prev) => ({
        ...prev,
        error: null,
      }));

      const data = await getConversationHistory(selectedConversationId);

      setChatState((prev) => ({
        ...prev,
        conversationId: data.conversationId,
        messages: data.messages.map((message, index) => ({
          role: message.role,
          content: message.content,
          timestamp: message.timestamp,
          _msgId: `msg-${index}-${Date.now()}`,
        })),
        view: "chat",
      }));
    } catch (err) {
      setChatState((prev) => ({
        ...prev,
        error: "Failed to load this conversation.",
        view: "list",
      }));
    }
  }, []);

  // Handle when a user clicks a predefined suggestion.
  const handleSelectSuggestion = useCallback(
    (suggestion, categoryKey) => {
      const topic = topicToDomain(categoryKey);

      setChatState((prev) => ({
        ...prev,
        activeTopic: topic,
      }));

      handleSendMessage(suggestion, topic);
    },
    [handleSendMessage],
  );

  const showHistoryButton = isAuth && chatState.view === "chat";

  return (
    <div className={`chatbot chatbot--${position}`}>
      {isOpen && (
        <div className="chatbot__panel">
          {chatState.view === "chat" ? (
            <>
              <ChatHeader
                isLoading={isLoading}
                showHistory={showHistoryButton}
                onHistory={openConversationList}
                onClose={toggleChat}
              />

              <MessageList
                messages={chatState.messages}
                isLoading={isLoading}
                error={!!chatState.error}
                errorMessage={chatState.error}
              />

              {/* Show predefined suggestions when there's no conversation yet. */}
              {showSuggestions &&
                chatState.messages.length === 0 &&
                !isLoading && (
                  <PredefinedSuggestions
                    onSelectSuggestion={handleSelectSuggestion}
                  />
                )}

              <ChatInput
                onSend={handleSendMessage}
                disabled={isLoading}
                showVoiceButton={showVoice}
                placeholder={`Ask about ${chatState.activeTopic}...`}
              />
            </>
          ) : (
            <ConversationsList
              onSelectConversation={selectConversation}
              onNewChat={startNewChat}
            />
          )}
        </div>
      )}

      <button
        className={`chatbot__toggle ${isOpen ? "chatbot__toggle--active" : ""}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X
            className="chatbot__toggle-icon chatbot__toggle-icon--close"
            size={28}
            strokeWidth={2.4}
          />
        ) : (
          <>
            <MessagesSquare
              className="chatbot__toggle-icon"
              size={28}
              strokeWidth={2}
            />

            <Sparkles
              className="chatbot__toggle-sparkles"
              size={16}
              strokeWidth={2.4}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
