import NotificationList from "./NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { FaCheckDouble } from "react-icons/fa";
import { useRef } from "react";
import "./NotificationPage.scss";
import { useAuth } from "../contexts/AuthContext";
import Badge from "./Badge";
import NotificationBell from "./NotificationBell";
import { IoNotifications, IoNotificationsCircleOutline } from "react-icons/io5";

const NotificationPage = () => {
  const { userData, isAuth } = useAuth();
  const {
    notifications,
    unreadCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    handleNotificationClick,
    handleMarkAllRead,
  } = useNotifications({
    type: "notifications",
    keys: ["page"],
    enabled: Boolean(isAuth && userData),
    limit: 10,
  });

  const lastElementRef = useRef(null);

  const handleLoadMore = async () => {
    await fetchNextPage();
    setTimeout(() => {
      lastElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100); // slight delay to ensure DOM update
  };

  return (
    <div className="notification-page">
      <header>
        <h1 className="title" style={{ marginBottom: "1.5rem" }}>
          <IoNotifications color="white" /> <span>All Notifications</span>
        </h1>
      </header>
      <div className="container">
        <div
          className="notification-modal"
          style={{
            position: "static",
            boxShadow: "none",
            maxWidth: "100%",
          }}
        >
          <div className="notification-modal-header">
            <div className="notification-header-title">
              <h4>Notifications</h4>

              {unreadCount > 0 && (
                <Badge variant="secondary">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            {notifications.some((n) => !n.isRead) && (
              <button className="mark-all-read" onClick={handleMarkAllRead}>
                <FaCheckDouble
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
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
                lastElementRef={lastElementRef}
              />
              {hasNextPage && (
                <div className="notification-footer">
                  <button
                    className="notification-load-more"
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
