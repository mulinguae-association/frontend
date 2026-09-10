import axios from "axios";
import logError from "../utils/logError";
import i18n from "../i18n";

const fetchUserProfile = async () => {
  try {
    const res = await axios.get("/api/auth/profile");
    return res.data;
  } catch (err) {
    logError("Error fetching user profile:", err);
    throw err;
  }
};

async function submitRegister(registerData) {
  try {
    const response = await axios.post(`/api/auth/register`, registerData);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error sending registration data");
  } catch (error) {
    logError("Error registering:", error);
    return { error: error.response?.data?.error || i18n.t("errorMessages.default") };
  }
}

async function submitLogin(loginData) {
  try {
    const response = await axios.post(`/api/auth/login`, loginData);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error sending login data");
  } catch (error) {
    logError("Error logging in:", error);
    return { error: error.response?.data?.error || i18n.t("errorMessages.default") };
  }
}
async function submitLogout() {
  try {
    const response = await axios.post(`/api/auth/logout`);
    if (response.status === 200) {
      return response;
    }
    throw new Error("Error logging out");
  } catch (error) {
    logError("Error logging out:", error);
    throw error;
  }
}

export { fetchUserProfile, submitLogin, submitRegister, submitLogout };
