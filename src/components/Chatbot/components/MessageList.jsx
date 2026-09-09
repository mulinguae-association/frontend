import React from "react";
import ChatMessage from "./ChatMessage";

/**
 * Renders a list of chat messages with auto-scroll.
 *
 * @param {object} props
 * @param {Array} props.messages - Array of message objects.
 * @param {boolean} [props.isLoading] - Whether a response is currently loading.
 * @param {boolean} [props.error] - Error state to display.
 * @param {string} [props.errorMessage] - Error message text.
 */
const MessageList = ({
  messages,
  isLoading,
  error = false,
  errorMessage = "",
}) => {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="message-list">
      {messages.length === 0 && !isLoading && !error && (
        <div className="message-list__empty">
          <p>Start a conversation! Ask me anything about Mulinguae.</p>
        </div>
      )}

      {messages.map((message, index) => (
        <ChatMessage
          key={message._msgId || `${message.timestamp}-${index}`}
          message={message}
          isLast={index === messages.length - 1}
        />
      ))}

      {isLoading && (
        <div className="chat-message chat-message--bot">
          <div className="chat-message__bubble chat-message__bubble--typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {error && (
        <div className="chat-message chat-message--error">
          <div className="chat-message__bubble">
            <p>{errorMessage || "Something went wrong. Please try again."}</p>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
