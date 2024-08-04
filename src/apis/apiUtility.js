import axios from "axios";
import logError from "../utils/logError";

const createTeacher = async (formData) => {
  try {
    const res = await axios.post(`/api/teachersCard`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (res.status === 200) {
      return { success: true };
    }
    return { success: false };

  } catch (error) {
    logError('Error adding teacher:', error);
    return error.response?.data?.error;
  }
}

const updateTeacher = async (teacherId, updatedTeacher) => {
  try {
    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();

    // Append each field of the updatedTeacher object to the FormData
    for (const key in updatedTeacher) {
      formData.append(key, updatedTeacher[key]);
    }

    // Make the PATCH request with the FormData
    const res = await axios.patch(`/api/updateTeacher/${teacherId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
      }
    });

    if (res.status === 200) {
      return { success: true };
    }
    return { success: false };

  } catch (error) {
    logError('Error updating teacher:', error);
    return { success: false, error: error.message };
  }
};

const fetchTeachers = async () => {
  try {
    const response = await axios.get('/api/teachers');
    return response.data;
  } catch (error) {
    logError('Error fetching teachers:', error);
    throw error;
  }
}

const deleteTeacher = async (teacherId) => {
  try {
    const res = await axios.delete(`/api/deleteTeacherCard/${teacherId}`);
    if (res.status === 200) {
      return { success: true };
    }
    return { success: false };

  } catch (error) {
    logError('Error deleting teacher:', error);
    return { success: false, error: error.message };
  }
};

export { createTeacher, updateTeacher, fetchTeachers, deleteTeacher };