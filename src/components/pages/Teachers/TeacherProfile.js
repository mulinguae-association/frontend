// Any component that needs to use teachers' data
import React from 'react';
import { useParams } from 'react-router-dom';
import getTeachersData from '../../../asset.json'; // Import the function

const TeacherProfile = () => {
  const { teacherId } = useParams(); // Get the teacherId from the URL parameter
  console.log(teacherId)

  const teachersData = getTeachersData // Use the function to get the data

  // Find the teacher with matching teacherId
  const teacher = teachersData.find(teacher => teacher.id === teacherId);

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <div>
      <h2>{teacher.name}</h2>
      <img src={teacher.image} alt={teacher.name} />
      <p>{teacher.profile.bio}</p>
      <h3>Subjects Taught:</h3>
      <ul>
        {teacher.profile.subjects.map((subject, index) => (
          <li key={index}>{subject}</li>
        ))}
      </ul>
      {teacher.customInfo &&
        <ul>
          <li>{teacher.customInfo?.contact}</li>
          <li>{teacher.customInfo?.about}</li>
        </ul>
      }
    </div >
  );
};

export default TeacherProfile;
