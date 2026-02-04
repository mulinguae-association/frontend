import NotificationList from "./NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { FaCheckDouble } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./NotificationPage.scss";
import { useAuth } from "../contexts/AuthContext";
import Badge from "./Badge";
import { IoNotifications } from "react-icons/io5";
import CustomDropdown from "./CustomDropdown";

const NotificationPage = () => {
  const { userData, isAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const [filter, setFilter] = useState(initialFilter);

  // Keep filter in sync with URL
  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (filter === "all") {
        params.delete("filter");
      } else {
        params.set("filter", filter);
      }
      return params;
    });
    // eslint-disable-next-line
  }, [filter]);

  const {
    notifications,
    unreadCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    handleNotificationClick,
    handleMarkAllRead,
    isLoading,
  } = useNotifications({
    type: "notifications",
    keys: ["page", filter],
    enabled: Boolean(isAuth && userData),
    limit: 10,
    filter,
  });

  const lastElementRef = useRef(null);

  const handleLoadMore = async () => {
    await fetchNextPage();
    setTimeout(() => {
      lastElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
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
              <Badge variant="secondary">
                {unreadCount > 0 ? unreadCount : 0} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </Badge>
            </div>
            <div className="notification-header-controls">
              <CustomDropdown
                options={[
                  { label: "All", value: "all" },
                  { label: "Unread", value: "unread" },
                  { label: "Read", value: "read" },
                ]}
                value={filter}
                onChange={setFilter}
                style={{ minWidth: 120, margin: "0 0.5rem" }}
              />
              {unreadCount > 0 && filter !== "read" && (
                <button className="mark-all-read" onClick={handleMarkAllRead}>
                  <FaCheckDouble
                    style={{ marginRight: 4, verticalAlign: "middle" }}
                  />
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="loading-notifications">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            <>
              <NotificationList
                notifications={notifications}
                onClick={handleNotificationClick}
                lastElementRef={lastElementRef}
              />
              {hasNextPage && notifications.length > 0 && (
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
