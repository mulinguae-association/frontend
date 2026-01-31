import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaCheckDouble } from "react-icons/fa";
import "./NotificationBell.scss";
import i18n from "../i18n";
import NotificationList from "./NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();
  const lang = i18n.language || "en";
  const { userData, isAuth } = useAuth();
  const {
    notifications,
    unreadCount,
    handleNotificationClick,
    handleMarkAllRead,
  } = useNotifications({
    type: "notifications",
    enabled: Boolean(isAuth && userData),
    limit: 10,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="notification-bell-container">
      <button className="notification-bell" onClick={() => setOpen(!open)}>
        <FaBell color="white" size={"20px"} />
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="notification-modal" ref={modalRef}>
          <div className="notification-modal-header">
            <h4>Your Notifications</h4>
            {notifications.some((n) => !n.isRead) && (
              <button className="mark-all-read" onClick={handleMarkAllRead}>
                <FaCheckDouble />
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            <>
              <NotificationList
                notifications={notifications}
                onClick={handleNotificationClick}
              />
              <div className="notification-footer">
                <button
                  className="notification-view-all"
                  onClick={() => navigate(`/${lang}/pages/notifications`)}
                >
                  view all notifications
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
