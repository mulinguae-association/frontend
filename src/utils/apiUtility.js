import axios from 'axios'
// create,get,delete Teachers
const createTeacher = async (formData) => {
  try {
    const res = await axios.post(`/api/teachersCard, ${formData}`);
    if (res.status === 200) { return { success: true } } else { return { success: false } }
  } catch (error) {
    console.error('Error adding teacher:', error);
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
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });

    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error updating teacher:', error);
  }
};

const fetchTeachers = async () => {
  try {
    const response = await axios.get('/api/teachers');
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
}

const deleteTeacher = async (teacherId) => {
  try {
    const res = await axios.delete(`/api/deleteTeacherCard/${teacherId}`);
    console.log(res)
    if (res.status === 200) { return { success: true } } else { return { success: false } }
  } catch (error) {
    console.error('Error deleting teacher:', error);
  }
};
export { createTeacher, updateTeacher, fetchTeachers, deleteTeacher };