import React, { useEffect, useState } from "react";
import { MessageSquare, Plus, Clock } from "lucide-react";
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
        setError("Failed to load conversations.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="conv-list">
      <div className="conv-list__header">
        <div className="conv-list__heading">
          <MessageSquare className="conv-list__heading-icon" size={16} strokeWidth={2.2} />
          <span className="conv-list__title">Your Conversations</span>
        </div>
        <button className="conv-list__new-btn" onClick={onNewChat} aria-label="New chat">
          <Plus size={16} strokeWidth={2.4} />
        </button>
      </div>

      {isLoading && (
        <div className="conv-list__status">Loading conversations...</div>
      )}

      {!isLoading && error && (
        <div className="conv-list__status conv-list__status--error">{error}</div>
      )}

      {!isLoading && !error && conversations.length === 0 && (
        <div className="conv-list__empty">
          <p>No conversations yet.</p>
          <p>Start a new chat to get help.</p>
        </div>
      )}

      {!isLoading && !error && conversations.length > 0 && (
        <div className="conv-list__items">
          {conversations.map((conv) => (
            <button
              key={conv.conversationId}
              className="conv-list__item"
              onClick={() => onSelectConversation(conv.conversationId)}
              aria-label={`Open conversation about ${conv.domain}`}
            >
              <span className="conv-list__item-domain">{domainToLabel(conv.domain)}</span>
              <span className="conv-list__item-snippet">
                {conv.lastMessage.slice(0, 80)}
                {conv.lastMessage.length > 80 ? "..." : ""}
              </span>
              <span className="conv-list__item-meta">
                <span className="conv-list__item-count">{conv.messageCount} msgs</span>
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
