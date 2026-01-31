import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import i18n from "../i18n";

// Default API and navigation config for notifications
const notificationConfig = {
  notifications: {
    apiFn: ({ pageParam = 1, limit = 10 }) =>
      import("../apis/notification-api").then(({ fetchNotifications }) =>
        fetchNotifications({ pageParam, limit }),
      ),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    markReadFn: async (note) => {
      const { markNotificationRead } = await import("../apis/notification-api");
      return markNotificationRead(note._id);
    },
    markAllReadFn: async () => {
      const { markAllNotificationsRead } =
        await import("../apis/notification-api");
      return markAllNotificationsRead();
    },
  },
  // Future: add other notification types here
};

export function useNotifications({
  type = "notifications",
  enabled = false,
  limit = 10,
} = {}) {
  const navigate = useNavigate();
  const config = notificationConfig[type];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery(
      type,
      ({ pageParam = 1 }) => config.apiFn({ pageParam, limit }),
      {
        getNextPageParam: config.getNextPageParam,
        refetchOnWindowFocus: false,
        enabled,
      },
    );

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];
  const unreadCount = data?.pages?.[0]?.unread || 0;

  const handleNotificationClick = async (note) => {
    if (!note.isRead) {
      await config.markReadFn(note);
      refetch();
    }
    if (note.link) {
      navigate(`/${i18n.language}${note.link}`);
    }
  };

  const handleMarkAllRead = async () => {
    await config.markAllReadFn();
    refetch();
  };

  return {
    notifications,
    unreadCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    handleNotificationClick,
    handleMarkAllRead,
  };
}
