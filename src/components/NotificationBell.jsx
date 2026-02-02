import { useState, useRef } from "react";
import { FaBell, FaCheckDouble } from "react-icons/fa";
import "./NotificationBell.scss";
import i18n from "../i18n";
import NotificationList from "./NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import ResponsiveOverlay from "./ResponsivePopover";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef();
  const lang = i18n.language || "en";
  const { userData, isAuth } = useAuth();
  const {
    notifications,
    unreadCount,
    handleNotificationClick,
    handleMarkAllRead,
  } = useNotifications({
    type: "notifications",
    keys: ["bell"],
    enabled: Boolean(isAuth && userData),
    limit: 10,
  });
  const navigate = useNavigate();

  return (
    <div className="notification-bell-container">
      <button
        className="notification-bell"
        ref={bellRef}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaBell color="white" size={"20px"} />
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>
      <ResponsiveOverlay
        open={open}
        onClose={() => setOpen(false)}
        popoverPlacement="bottom"
        title="Your Notifications"
      >
        <>
          {notifications.some((n) => !n.isRead) && (
            <button className="mark-all-read" onClick={handleMarkAllRead}>
              <FaCheckDouble />
              Mark all as read
            </button>
          )}
        </>
        {notifications.length === 0 ? (
          <div className="no-notifications">No notifications</div>
        ) : (
          <>
            <NotificationList
              notifications={notifications}
              onClick={(note) => {
                setOpen(false);
                handleNotificationClick(note);
              }}
            />
            <div className="notification-footer">
              <button
                className="notification-view-all"
                onClick={() => {
                  setOpen(false);
                  navigate(`/${lang}/pages/notifications`);
                }}
              >
                view all notifications
              </button>
            </div>
          </>
        )}
      </ResponsiveOverlay>
    </div>
  );
};

export default NotificationBell;
