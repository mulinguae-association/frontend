import axios from 'axios';
import logError from '../utils/logError';
export async function submitInfo(formData, userType) {
  try {
    const response = await axios.post(`/api/submit-info/${userType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Data Sent Successfully');
      }
      return response.data.message;
    }
    logError('Error: Response status is not 200', response);
    return response.data.message;
  } catch (error) {
    logError('Error sending Register data:', error);
    throw new Error(`Error sending Register data: ${error.response?.data?.message || error.message}`);
  }
}