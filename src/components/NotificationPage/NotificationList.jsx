import { format, formatDistanceToNow } from "date-fns";
import { Trans, useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";

const NotificationList = ({
  notifications,
  onClick,
  style,
  lastElementRef,
  selected = [],
  onSelect,
}) => {
  const { t } = useTranslation("notifications");
  return (
    <ul className="notification-list" style={style}>
      {notifications.map((note, idx) => {
        const rawString = t(note.messageKey, {
          author: note.messageParams?.author,
          blogTitle: note.messageParams?.blogTitle,
        });
        const stringForTitle = rawString.replace(/<\/?author>/g, "");
        const isLast = idx === notifications.length - 1;
        return (
          <li
            ref={isLast ? lastElementRef : null}
            key={note._id || idx}
            className={`${note.isRead ? "notification-read" : "notification-unread"} ${selected.includes(note._id) ? "notification-selected" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              background: selected.includes(note._id) ? "#eaf3ff" : undefined,
              border: selected.includes(note._id)
                ? "2px solid #2563eb"
                : undefined,
            }}
          >
            {onSelect && (
              <label
                style={{
                  marginRight: 10,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(note._id)}
                  onChange={(e) => onSelect(note._id, e.target.checked)}
                  aria-label="Select notification"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    left: 0,
                    top: 0,
                    width: 20,
                    height: 20,
                    margin: 0,
                  }}
                />
                <span
                  style={{
                    width: 20,
                    height: 20,
                    border: selected.includes(note._id)
                      ? "2px solid #2563eb"
                      : "2px solid #cbd5e1",
                    borderRadius: 4,
                    background: selected.includes(note._id)
                      ? "#2563eb"
                      : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s",
                  }}
                >
                  {selected.includes(note._id) && (
                    <FaCheck color="#fff" size={14} />
                  )}
                </span>
              </label>
            )}
            <button
              className="notification-link"
              title={stringForTitle}
              onClick={() => onClick && onClick(note)}
              style={{ flex: 1 }}
            >
              <div className="notification-container">
                <div className="notification-avatar-container">
                  {note.sourceId && note.sourceId.postedBy && (
                    <img
                      src={note.sourceId?.postedBy?.profileImage}
                      alt="User Avatar"
                      className="notification-avatar"
                    />
                  )}
                </div>
                <div className="notification-info-wrapper">
                  <div className="notification-info-row">
                    <span className="notification-action">
                      {
                        <Trans
                          ns="notifications"
                          i18nKey={note.messageKey}
                          values={note.messageParams || {}}
                          components={{
                            author: <span className="notification-username" />,
                          }}
                        />
                      }
                    </span>
                    <span>
                      {!note.isRead && <span className="unread-dot" />}
                    </span>
                  </div>
                  <div className="notification-info-row">
                    <span className="notification-date">
                      {format(new Date(note.createdAt), "EEEE h:mmaaa")}
                    </span>
                    {note.createdAt && (
                      <span className="notification-time-ago">
                        {formatDistanceToNow(new Date(note.createdAt), {
                          addSuffix: true,
                        }).replace("about ", "")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {(note.title || note.message) && (
                <p className="notification-msg-title">
                  {note.title || note.message}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default NotificationList;
