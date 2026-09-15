import axios from "axios";
import { refreshAccessToken } from "./auth-api.js";
import { clearSession } from "../contexts/sessionStore.js";

const SKIP_REFRESH = /\/auth\/(login|register|refresh|logout)$/;

export const setupAuthInterceptor = (instance = axios) => {
  instance.interceptors.response.use(
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
        return instance(config);
      } catch (refreshError) {
        clearSession();
        return Promise.reject(error);
      }
    },
  );
};

setupAuthInterceptor(axios);