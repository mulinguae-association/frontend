// User management API utility
import axios from "axios";

export const fetchUsers = (params) => axios.get("/api/users", { params });
export const fetchUser = (id) => axios.get(`/api/users/${id}`);
export const updateUser = (id, data) => axios.put(`/api/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);
export const createUser = (data) => axios.post("/api/users", data);
export const resetUserPassword = (id, data) =>
  axios.post(`/api/users/${id}/reset-password`, data);

export const restoreUser = (id) => axios.post(`/api/users/${id}/restore`);
