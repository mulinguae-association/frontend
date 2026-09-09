import React, { useState, useRef, useEffect } from "react";
import { isValidMessage } from "../utils/chatbotUtils";

/**
 * Chat input component with message sending and optional voice input.
 *
 * @param {object} props
 * @param {function} props.onSend - Callback when a message is sent. Receives the message string.
 * @param {boolean} [props.disabled] - Whether the input is disabled.
 * @param {boolean} [props.showVoiceButton] - Whether to show the voice input button.
 * @param {function} [props.onVoiceStart] - Callback when voice input starts.
 * @param {function} [props.onVoiceEnd] - Callback when voice input ends.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {number} [props.maxLength] - Maximum message length.
 */
const ChatInput = ({
  onSend,
  disabled = false,
  showVoiceButton = false,
  onVoiceStart,
  onVoiceEnd,
  placeholder = "Type a message...",
  maxLength = 4000,
}) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!isValidMessage(trimmed) || disabled) return;
    onSend(trimmed);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      onVoiceEnd?.();
    } else {
      setIsRecording(true);
      onVoiceStart?.();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <div className={`chat-input ${isRecording ? "chat-input--recording" : ""}`}>
      <form className="chat-input__form" onSubmit={handleSubmit}>
        <textarea
          ref={inputRef}
          className="chat-input__textarea"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isRecording}
          rows={1}
          maxLength={maxLength}
        />
        <div className="chat-input__actions">
          {showVoiceButton && (
            <button
              type="button"
              className={`chat-input__voice-btn ${isRecording ? "chat-input__voice-btn--active" : ""}`}
              onClick={handleVoiceToggle}
              aria-label={isRecording ? "Stop voice input" : "Start voice input"}
            >
              {isRecording ? "⏹" : "🎙"}
            </button>
          )}
          <button
            type="submit"
            className="chat-input__send-btn"
            disabled={!isValidMessage(message.trim()) || disabled || isRecording}
          >
            ➤
          </button>
        </div>
        {isNearLimit && (
          <span className="chat-input__char-count chat-input__char-count--warning">
            {characterCount}/{maxLength}
          </span>
        )}
      </form>
    </div>
  );
};

export default React.memo(ChatInput);
