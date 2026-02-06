import { FaCheckDouble } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./NotificationPage.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import Badge from "../UI/Badge";
import { IoNotifications } from "react-icons/io5";
import CustomDropdown from "../CustomDropdown";
import { deleteNotifications } from "../../apis/notification-api";
import NotificationList from "./NotificationList";
import SelectableList from "../UI/SelectableList";
import ResponsiveModal from "../UI/ResponsiveModal";
import { notifyError, notifySuccess } from "../Notify";

const NotificationPage = () => {
  const { userData, isAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const [filter, setFilter] = useState(initialFilter);
  // controlled selection state for SelectableList
  const [selected, setSelected] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep filter in sync with URL
  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (filter === "all") {
        params.delete("filter");
      } else {
        params.set("filter", filter);
      }
      setSelected([]);
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
    refetch,
  } = useNotifications({
    type: "notifications",
    keys: ["page", filter],
    enabled: Boolean(isAuth && userData),
    limit: 10,
    filter,
  });

  const lastElementRef = useRef(null);

  // Modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const openDeleteConfirm = () => {
    if (selected.length === 0) return;
    setPendingAction("delete");
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (pendingAction === "delete") {
      // call backend
      try {
        setIsDeleting(true);
        await deleteNotifications(selected);
        // refresh notifications and clear selection
        await refetch();
        notifySuccess("Notifications deleted successfully");
        setSelected([]);
      } catch (err) {
        notifyError("Failed to delete notifications");
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
    setConfirmOpen(false);
    setPendingAction(null);
  };

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
      <div className="container">
        <header>
          <h1 className="title" style={{ marginBottom: "1.5rem" }}>
            <IoNotifications color="white" /> <span>All Notifications</span>
          </h1>
        </header>
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
          ) : (
            notifications.length === 0 && (
              <div className="no-notifications">No notifications</div>
            )
          )}

          <SelectableList
            items={notifications}
            idKey="_id"
            style={{ marginBottom: 12 }}
            selected={selected}
            onSelectionChange={setSelected}
            renderActions={({
              selected: sel,
              allSelected,
              handleSelectAll,
            }) => (
              <div
                className="notification-bulk-bar"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <button
                  type="button"
                  className="select-all-btn"
                  style={{
                    padding: "0.4em 1.1em",
                    borderRadius: 6,
                    border: allSelected
                      ? "2px solid #2563eb"
                      : "2px solid #cbd5e1",
                    background: allSelected ? "#2563eb" : "#fff",
                    color: allSelected ? "#fff" : "#1e293b",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                  onClick={() => handleSelectAll(!allSelected)}
                  aria-pressed={allSelected}
                >
                  {allSelected ? "Unselect all" : "Select all"}
                </button>
                <CustomDropdown
                  options={[
                    { label: "Bulk actions", value: "" },
                    {
                      label: `Delete selected (${sel.length})`,
                      value: "delete",
                    },
                  ]}
                  value={""}
                  onChange={(action) => {
                    if (action === "delete" && sel.length > 0) {
                      openDeleteConfirm();
                    }
                  }}
                  style={{ minWidth: 160, margin: "0 0.5rem" }}
                  disabled={sel.length === 0}
                />
              </div>
            )}
            renderRow={({ item, selected, onSelect }) => (
              <NotificationList
                notifications={[item]}
                onClick={handleNotificationClick}
                lastElementRef={lastElementRef}
                selected={selected ? [item._id] : []}
                onSelect={(id, checked) => onSelect(checked)}
              />
            )}
          />
          {confirmOpen && (
            <ResponsiveModal
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              title="Delete notifications"
              isConfirm={true}
              setConfirmOpen={setConfirmOpen}
              handleConfirm={handleConfirm}
              btnTitle="Cancel"
              btnConfirmTitle="Delete"
              isLoading={isDeleting}
            >
              <p>{`Are you sure you want to delete ${selected.length} notification${selected.length !== 1 ? "s" : ""}?`}</p>
            </ResponsiveModal>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
