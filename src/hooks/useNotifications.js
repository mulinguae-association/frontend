import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import i18n from "../i18n";
import socket from "../utils/socket";
import useNotificationSound from "./userNotificationSound.js";

// Default API and navigation config for notifications
const notificationConfig = {
  notifications: {
    apiFn: ({ pageParam = 1, limit = 10, filter = "all" }) =>
      import("../apis/notification-api").then(({ fetchNotifications }) =>
        fetchNotifications({ pageParam, limit, filter }),
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
  keys = [],
  enabled = false,
  limit = 10,
  filter = "all",
  event = "newNotification",
} = {}) {
  const navigate = useNavigate();
  const config = notificationConfig[type];
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    keys.length > 0 ? [type, ...keys] : type,
    ({ pageParam = 1 }) => config.apiFn({ pageParam, limit, filter }),
    {
      getNextPageParam: config.getNextPageParam,
      refetchOnWindowFocus: false,
      enabled,
    },
  );

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];
  const unreadCount = data?.pages?.[0]?.unread || 0;

  // Real-time notification handler
  const notificationSound = useNotificationSound();
  useEffect(() => {
    const events = Array.isArray(event) ? event : [event];
    function handleNewNotification(notification) {
      const id = notification._id;
      notificationSound.play?.(id);
      queryClient.setQueryData(
        keys.length > 0 ? [type, ...keys] : type,
        (oldData) => {
          if (!oldData) {
            return {
              pages: [{ notifications: [notification], unread: 1 }],
              pageParams: [],
            };
          }
          const exists = oldData.pages.some((page) =>
            page.notifications.some((n) => n._id === id),
          );
          if (exists) return oldData;
          return {
            ...oldData,
            pages: [
              {
                ...oldData.pages[0],
                notifications: [
                  notification,
                  ...oldData.pages[0].notifications,
                ],
                unread: (oldData.pages[0].unread || 0) + 1,
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );
    }
    for (const evt of events) {
      socket.on(evt, handleNewNotification);
    }
    return () => {
      for (const evt of events) {
        socket.off(evt, handleNewNotification);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, type, keys, event, notificationSound]);

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
    isLoading,
  };
}
