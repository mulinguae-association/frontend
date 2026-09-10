import { formatTime as formatTimeShared } from "../../../utils/formatTime";

/**
 * Utility functions for the chatbot feature.
 * All utilities are designed to be reusable and extensible.
 */

/**
 * Generate a unique conversation ID.
 * @returns {string} A unique identifier for a conversation.
 */
export const generateConversationId = () => {
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Format a timestamp for display in the chat UI.
 * @param {Date|string|number} timestamp - The timestamp to format.
 * @param {string} [language] - i18n language code (defaults to current).
 * @returns {string} Formatted time string (e.g., "2:30 PM", "2:30 م").
 */
export const formatTime = (timestamp, language) =>
  formatTimeShared(timestamp, language);

/**
 * Sanitize user input to prevent XSS attacks.
 * @param {string} input - The raw user input.
 * @returns {string} Sanitized input safe for display.
 */
export const sanitizeInput = (input) => {
  if (!input) return "";
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Tokenize a message into words for rate limit estimation.
 * @param {string} message - The message to tokenize.
 * @returns {number} Approximate token count.
 */
export const estimateTokenCount = (message) => {
  if (!message) return 0;
  const words = message.trim().split(/\s+/).filter(Boolean);
  // Approximation: 1 word ≈ 1.3 tokens on average
  return Math.ceil(words.length * 1.3);
};

/**
 * Determine if the chatbot should respond based on message content.
 * @param {string} message - The user's message.
 * @returns {boolean} True if the message is valid for processing.
 */
export const isValidMessage = (message) => {
  if (!message || typeof message !== "string") return false;
  const trimmed = message.trim();
  return trimmed.length > 0 && trimmed.length <= 4000;
};

/**
 * Format a date to show in the chat header.
 * @param {Date|string|number} timestamp - The timestamp to format.
 * @returns {string} Formatted date string (e.g., "Jan 1, 2025").
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
};

/**
 * Parse a Groq-compatible message format into internal message format.
 * @param {object} groqMessage - A message object from Groq API.
 * @returns {object} Internal message format.
 */
export const parseGroqMessage = (groqMessage) => {
  return {
    role: groqMessage.role || "assistant",
    content: groqMessage.content || "",
    timestamp: Date.now(),
  };
};

/**
 * Parse an internal message format into Groq-compatible format.
 * @param {object} message - Internal message format.
 * @returns {object} Groq-compatible message format.
 */
export const toGroqMessageFormat = (message) => {
  return {
    role: message.role,
    content: message.content,
  };
};

/**
 * Generate a context prompt for the Groq model based on domain.
 * This makes it easy to scope the AI's knowledge for different features (e.g., teacher profiles).
 * @param {string} domain - The domain context ("general", "teachers", etc.)
 * @returns {string} System prompt tailored to the domain.
 */
export const getDomainSystemPrompt = (domain = "general") => {
  const prompts = {
    general: `You are Mulinguae's AI assistant. You help users with questions about the Mulinguae platform, language learning resources, courses, and community features. Be helpful, friendly, and informative.`,
    teachers: `You are Mulinguae's AI assistant specialized in teacher profiles and education. You can provide information about teachers, their expertise, teaching methods, and language courses. Use the provided context to answer questions accurately.`,
  };
  return prompts[domain] || prompts.general;
};

// Map a suggestion category key to the backend conversation domain value.
const TOPIC_DOMAIN_MAP = {
  gettingStarted: "getting-started",
  teachers: "teachers",
  courses: "courses",
  booking: "booking",
  technical: "technical",
  community: "community",
};

/**
 * Convert a suggestion category key (e.g. "gettingStarted") to the backend
 * conversation domain value (e.g. "getting-started").
 * @param {string} categoryKey - Suggestion category key.
 * @returns {string} Domain value to store on the conversation.
 */
export const topicToDomain = (categoryKey) => TOPIC_DOMAIN_MAP[categoryKey] || "general";

// Human-friendly labels for each stored domain (fallback, used when no translator is provided).
const DOMAIN_LABELS = {
  general: "General",
  teachers: "Teachers",
  courses: "Courses",
  blogs: "Blogs",
  "getting-started": "Getting Started",
  booking: "Booking",
  technical: "Technical",
  community: "Community",
};

/**
 * Convert a stored conversation domain into a human-readable label.
 * @param {string} domain - Stored domain value.
 * @param {Function} [t] - Optional i18next translate function. When provided,
 *   the label is looked up under `chatbot.domain.<domain>` so it is localized.
 * @returns {string} Display label.
 */
export const domainToLabel = (domain, t) => {
  if (t && typeof t === "function") {
    const localized = t(`chatbot.domain.${domain}`, { defaultValue: "" });
    if (localized) return localized;
  }
  return DOMAIN_LABELS[domain] || "General";
};

export default {
  generateConversationId,
  formatTime,
  sanitizeInput,
  estimateTokenCount,
  isValidMessage,
  formatDate,
  parseGroqMessage,
  toGroqMessageFormat,
  getDomainSystemPrompt,
  topicToDomain,
  domainToLabel,
};
