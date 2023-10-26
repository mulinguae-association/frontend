import axios from 'axios';
export async function submitInfo(formData, userType) {
  try {
    const response = await axios.post(`/api/submit-info/${userType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

    if (response.status === 200) {
      console.log('Data Sent Successfully');
      return response.data.message;
    } else {
      console.error('Error: Response status is not 200');
      console.error(response);
      return response.data.message
    }
  } catch (error) {
    console.error('Error sending Register data:', error);
    throw new Error('Error sending Register data: ' + error.response.data.message);
  }
}