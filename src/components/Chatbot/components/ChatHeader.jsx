import React from "react";
import { Sparkles, History, X } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Header for the chatbot panel showing title and status.
 * @param {object} props
 * @param {string} [props.title] - Title to display.
 * @param {string} [props.subtitle] - Subtitle shown under the title.
 * @param {boolean} [props.isLoading] - Whether the bot is currently processing.
 * @param {boolean} [props.showHistory] - Whether to show the history button.
 * @param {function} [props.onHistory] - Callback when history button is clicked.
 * @param {function} [props.onClose] - Callback to close/dismiss the chat.
 */
const ChatHeader = ({
  title,
  subtitle,
  isLoading,
  showHistory,
  onHistory,
  onClose,
}) => {
  const { t } = useTranslation("global");
  const headerTitle = title || t("chatbot.title");
  const headerSubtitle = subtitle || t("chatbot.subtitle");
  return (
    <div className="chat-header">
      <div className="chat-header__brand">
        <span className="chat-header__bot-icon">
          <Sparkles size={18} strokeWidth={2.2} />
        </span>
        <div className="chat-header__text">
          <div className="chat-header__title">{headerTitle}</div>
          {headerSubtitle && (
            <div className="chat-header__subtitle">{headerSubtitle}</div>
          )}
        </div>
      </div>
      <div className="chat-header__actions">
        <div className="chat-header__status">
          {isLoading && (
            <span className="chat-header__typing">{t("chatbot.typing")}</span>
          )}
          {!isLoading && (
            <span className="chat-header__online">{t("chatbot.online")}</span>
          )}
        </div>
        {showHistory && (
          <button
            className="chat-header__icon-btn"
            onClick={onHistory}
            aria-label={t("chatbot.viewConversations")}
            title={t("chatbot.viewConversations")}
          >
            <History size={16} strokeWidth={2.2} />
          </button>
        )}
        {onClose && (
          <button
            className="chat-header__icon-btn chat-header__close"
            onClick={onClose}
            aria-label={t("chatbot.closeChat")}
            title={t("chatbot.closeChat")}
          >
            <X size={18} strokeWidth={2.4} />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ChatHeader);
