import React, { useEffect, useState } from "react";
import { MessageSquare, Plus, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getConversations } from "../../../apis/chatbot-api";
import { formatTime, domainToLabel } from "../utils/chatbotUtils";

/**
 * Displays a list of the authenticated user's past conversations as clickable blocks.
 * Each block shows the domain, last message snippet, and timestamp.
 *
 * @param {object} props
 * @param {function} props.onSelectConversation - Callback when a conversation block is clicked.
 *   Receives the conversationId.
 * @param {function} props.onNewChat - Callback to start a new chat.
 */
const ConversationsList = ({ onSelectConversation, onNewChat }) => {
  const { t } = useTranslation("global");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const data = await getConversations();
        setConversations(data);
        setError(null);
      } catch (err) {
        setError(t("chatbot.loadFailed"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, [t]);

  return (
    <div className="conv-list">
      <div className="conv-list__header">
        <div className="conv-list__heading">
          <MessageSquare className="conv-list__heading-icon" size={16} strokeWidth={2.2} />
          <span className="conv-list__title">{t("chatbot.yourConversations")}</span>
        </div>
        <button
          className="conv-list__new-btn"
          onClick={onNewChat}
          aria-label={t("chatbot.newChat")}
        >
          <Plus size={16} strokeWidth={2.4} />
        </button>
      </div>

      {isLoading && (
        <div className="conv-list__status">{t("chatbot.loadingConversations")}</div>
      )}

      {!isLoading && error && (
        <div className="conv-list__status conv-list__status--error">{error}</div>
      )}

      {!isLoading && !error && conversations.length === 0 && (
        <div className="conv-list__empty">
          <p>{t("chatbot.noConversations")}</p>
          <p>{t("chatbot.startNewChat")}</p>
        </div>
      )}

      {!isLoading && !error && conversations.length > 0 && (
        <div className="conv-list__items">
          {conversations.map((conv) => (
            <button
              key={conv.conversationId}
              className="conv-list__item"
              onClick={() => onSelectConversation(conv.conversationId)}
              aria-label={t("chatbot.openConversation", { domain: conv.domain })}
            >
              <span className="conv-list__item-domain">{domainToLabel(conv.domain, t)}</span>
              <span className="conv-list__item-snippet">
                {conv.lastMessage.slice(0, 80)}
                {conv.lastMessage.length > 80 ? "..." : ""}
              </span>
              <span className="conv-list__item-meta">
                <span className="conv-list__item-count">
                  {t("chatbot.msgs", { count: conv.messageCount })}
                </span>
                <span className="conv-list__item-time">
                  <Clock size={11} strokeWidth={2.2} />
                  {formatTime(conv.updatedAt)}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ConversationsList);
