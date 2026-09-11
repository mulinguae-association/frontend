import axios from "axios";
import { refreshAccessToken } from "./auth-api.js";
import { clearSession } from "../contexts/sessionStore.js";

const SKIP_REFRESH = /\/auth\/(login|register|refresh|logout)$/;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error || {};
    if (!response || response.status !== 401 || !config || config.__isAuthRetry) {
      return Promise.reject(error);
    }
    if (SKIP_REFRESH.test(config.url || "")) {
      return Promise.reject(error);
    }

    try {
      await refreshAccessToken();
      config.__isAuthRetry = true;
      return axios(config);
    } catch (refreshError) {
      clearSession();
      return Promise.reject(error);
    }
  },
);