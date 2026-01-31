import axios from "axios";

// src/apis/notification-api.js
export const fetchNotifications = async ({ pageParam = 1, limit = 10 }) => {
  const res = await axios.get(
    `/api/notifications?page=${pageParam}&limit=${limit}`,
  );
  return res.data; // Should include { notifications, hasMore }
};

export const markNotificationRead = async (id) => {
  const res = await axios.patch(`/api/notifications/${id}/read`);
  return res.data;
};

export const markAllNotificationsRead = async () => {
  return axios.patch("/api/notifications/read-all");
};
