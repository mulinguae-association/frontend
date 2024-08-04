import axios from 'axios';
import logError from '../utils/logError';

export async function submitRegister(RegisterData) {
  try {
    const response = await axios.post(`/api/auth/register`, RegisterData);
    if (response.status === 200) {
      // Reset form fields
      return response.data;
    }
    throw new Error("Error sending Register data");

  } catch (error) {
    logError("Error registering:", error);
    return { error: error.response?.data?.error || "An error occurred" };
  }
}

// Login
export async function submitLogin(LoginData) {
  try {
    const response = await axios.post(`/api/auth/login`, LoginData);

    if (response.status === 200) {
      // Reset form fields
      return response.data;
    }
    throw new Error("Error sending Login data");

  } catch (error) {
    logError("Error logging in:", error);
    return { error: error.response?.data?.error || "An error occurred" };
  }
}

// Logout
export async function submitLogout() {
  try {
    const response = await axios.get(`/api/auth/logout`);

    if (response.status === 200) {
      return response;
    }
    throw new Error("Error Logging out");

  } catch (error) {
    logError("Error logging out:", error);
    return { error: error.message || "An error occurred" };
  }
}
