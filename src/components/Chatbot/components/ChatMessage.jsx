import React from "react";
import { formatTime } from "../utils/chatbotUtils";

/**
 * A single chat message bubble.
 * @param {object} props
 * @param {object} props.message - The message object {role, content, timestamp}.
 * @param {boolean} [props.isLast] - Whether this is the last message (for styling).
 */
const ChatMessage = ({ message, isLast = false }) => {
  const { role, content, timestamp } = message;
  const isUser = role === "user";

  return (
    <div
      className={`chat-message ${isUser ? "chat-message--user" : "chat-message--bot"} ${
        isLast ? "chat-message--last" : ""
      }`}
    >
      <div className="chat-message__bubble">
        <p className="chat-message__text">{content}</p>
      </div>
      <span className="chat-message__time">{formatTime(timestamp)}</span>
    </div>
  );
};

export default ChatMessage;
