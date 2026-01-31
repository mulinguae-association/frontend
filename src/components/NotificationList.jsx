import { format, formatDistanceToNow } from "date-fns";
import { Trans } from "react-i18next";

const NotificationList = ({
  notifications,
  onClick,
  style,
  lastElementRef,
}) => {
  return (
    <ul className="notification-list" style={style}>
      {notifications.map((note, idx) => {
        const isLast = idx === notifications.length - 1;
        return (
          <li
            ref={isLast ? lastElementRef : null}
            key={note._id || idx}
            className={
              note.isRead ? "notification-read" : "notification-unread"
            }
          >
            <button
              className="notification-link"
              onClick={() => onClick && onClick(note)}
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
