import NotificationList from "./NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { FaCheckDouble } from "react-icons/fa";
import { useRef } from "react";
import "./NotificationPage.scss";
import { useAuth } from "../contexts/AuthContext";

const NotificationPage = () => {
  const { userData, isAuth } = useAuth();
  const {
    notifications,
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
      <h2 className="header" style={{ marginBottom: "1.5rem" }}>
        All Notifications
      </h2>
      <div
        className="notification-modal"
        style={{
          position: "static",
          boxShadow: "none",
          maxWidth: "100%",
        }}
      >
        <div className="notification-modal-header">
          <h4>Notifications</h4>
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
  );
};

export default NotificationPage;
