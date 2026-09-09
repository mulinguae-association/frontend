/**
 * Chatbot Feature - Public API
 * Import this file to get all chatbot exports.
 */

// Main component
export { default as Chatbot } from "./Chatbot";

// Components
export { default as ChatHeader } from "./components/ChatHeader";
export { default as ChatMessage } from "./components/ChatMessage";
export { default as ChatInput } from "./components/ChatInput";
export { default as MessageList } from "./components/MessageList";
export { default as PredefinedSuggestions } from "./components/PredefinedSuggestions";

// Utils
export {
  generateConversationId,
  formatTime,
  sanitizeInput,
  estimateTokenCount,
  isValidMessage,
  formatDate,
  parseGroqMessage,
  toGroqMessageFormat,
  getDomainSystemPrompt,
} from "./utils/chatbotUtils";
