// Any component that needs to use teachers' data
import { React, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../contexts/AppContext';

const TeacherProfile = () => {
  const { teachers, getTeachers } = useContext(AppContext)
  const navigate = useNavigate()

  const { teacherId } = useParams(); // Get the teacherId from the URL parameter
  console.log(teachers)
  // Find the teacher with matching teacherId
  const teacher = teachers.find(teacher => teacher.firstName + teacher._id === teacherId);
  useEffect(() => {
    getTeachers()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goBack = () => {
    navigate(-1)
    // Scroll to the specific section when the component mounts
    setTimeout(() => {
      const specificSection = document.querySelector('.teachers_overview');
      if (specificSection) {
        specificSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  if (!teacher) {
    return <div>Teacher not found</div>;
  }
  return (
    <main className='page_content teacher_profile'>
      <div className='container'>
        <button className='btn back_btn' onClick={goBack}><span className='back_icon'><img width={25} height={25} src='/images/icons/backArrow.png' alt='back arrow' /></span> Back</button>
        <section className='teacher_content'>
          <div className='main_info'>
            <div className='info'>
              <h3>firstName: <span>{teacher.firstName}</span></h3>
              <h3>lastName: <span>{teacher.lastName}</span></h3>
              <h3>email: <span>{teacher.email}</span></h3>
              <h3>Telephone/ Cellphone: <span>{teacher.telephone}</span></h3>
            </div>
            <img width="300px" height="300px" src={teacher?.image} alt={teacher?.name} onError={(e) => {
              e.target.src = "/images/fallBackUser.png";
            }} />
          </div>
          <div className='secondary_info'>
            <div className='block'>
              <h3>Teaching philosophy</h3>
              {teacher?.teaching_philosophy ? (
                <p>{teacher.teaching_philosophy}</p>
              ) : (
                <p>No teaching philosophy available</p>
              )}
            </div>
            <div className='block'>
              <h3>career summary</h3>
              {teacher?.career_summary ? (
                <p>{teacher.career_summary}</p>
              ) : (
                <p>No career summary available</p>
              )}
            </div>
            <div className='block'>
              <h3>Teaching methods and strategies</h3>
              {teacher?.teaching_methods ? (
                <p>{teacher.teaching_methods}</p>
              ) : (
                <p>No teaching methods and strategies available</p>
              )}
            </div>
            <div className='block'>
              <h3>Qualification and Certificates</h3>
              {teacher?.qualification_cert ? (
                <p>{teacher.qualification_cert}</p>
              ) : (
                <p>No qualification and certificates available</p>
              )}
            </div>
            <div className='block'>
              <h3>Teacher Collaboration</h3>
              {teacher?.teacher_collaboration ? (
                <p>{teacher.teacher_collaboration}</p>
              ) : (
                <p>No teacher collaboration information available</p>
              )}
            </div>
            <div className='block'>
              <h3>Classroom management</h3>
              {teacher?.classroom_management ? (
                <p>{teacher.classroom_management}</p>
              ) : (
                <p>No classroom management information available</p>
              )}
            </div>
            <div className='block'>
              <h3>Behavior management</h3>
              {teacher?.behavior_management ? (
                <p>{teacher.behavior_management}</p>
              ) : (
                <p>No behavior management information available</p>
              )}
            </div>
            <div className='block'>
              <h3>Additional Information</h3>
              {teacher?.additional_info ? (
                <p>{teacher.additional_info}</p>
              ) : (
                <p>No additional information available</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TeacherProfile;
