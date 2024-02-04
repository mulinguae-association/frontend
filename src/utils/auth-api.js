import axios from 'axios';
export async function submitRegister(RegisterData) {
  try {
    const response = await axios.post(`/api/auth/register`, RegisterData);
    console.log(response)
    if (response.status === 200) {
      console.log("Data Sent Successfuly");
      // Reset form fields
      return response.data;
    } else {
      throw new Error("Error sending Register data");
    }
  } catch (error) {
    console.log(error.response.data.error)
    return { error: error.response.data.error }
  }
}
// Login
export async function submitLogin(LoginData) {
  try {
    const response = await axios.post(`/api/auth/login`, LoginData);

    if (response.status === 200) {
      console.log("Data Sent Successfuly");
      // Reset form fields
      return response.data;
    } else {
      throw new Error("Error sending Login data");
    }
  } catch (error) {
    throw new Error("Error sending Login data: " + error.message);
  }
}
// Login
export async function submitLogout() {
  try {
    const response = await axios.get(`/api/auth/logout`);

    if (response.status === 200) {
      return response
    } else {
      throw new Error("Error Logging out");
    }
  } catch (error) {
    throw new Error("Error Logging out : " + error.message);
  }
}
