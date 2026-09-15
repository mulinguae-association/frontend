import { formatTime as formatTimeShared } from "../../../utils/formatTime";

/**
 * Utility functions for the chatbot feature.
 * All utilities are designed to be reusable and extensible.
 */

/**
 * Format a timestamp for display in the chat UI.
 * @param {Date|string|number} timestamp - The timestamp to format.
 * @param {string} [language] - i18n language code (defaults to current).
 * @returns {string} Formatted time string (e.g., "2:30 PM", "2:30 م").
 */
export const formatTime = (timestamp, language) =>
  formatTimeShared(timestamp, language);

/**
 * Sanitize and normalize user input.
 * In React, JSX safely renders plain text without dangerouslySetInnerHTML.
 * Trims extraneous whitespace and removes null bytes.
 * @param {string} input - The raw user input.
 * @returns {string} Sanitized input string.
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input.replace(/\0/g, "").trim();
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
export const topicToDomain = (categoryKey) =>
  TOPIC_DOMAIN_MAP[categoryKey] || "general";

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
  formatTime,
  sanitizeInput,
  isValidMessage,
  topicToDomain,
  domainToLabel,
};
