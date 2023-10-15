// Any component that needs to use teachers' data
import { React, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../contexts/AppContext';
import "./Teachers.scss"
import { useTranslation } from 'react-i18next';
import { BiSolidArrowToLeft } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
const TeacherProfile = () => {
  const { teachers, getTeachers } = useContext(AppContext)
  const { t, i18n } = useTranslation('pages/teachers', { ns: 'teachers' });
  const navigate = useNavigate()
  const lang = i18n.language === "Ar"
  const { teacherId } = useParams(); // Get the teacherId from the URL parameter
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
        <button className='btn back_btn' onClick={goBack}><span style={lang ? { rotate: "180deg" } : {}} className='back_icon'>
          <IoIosArrowBack size={26} />
        </span> {t('sec7_link1')}</button>
        <section className='teacher_content'>
          <div className='main_info'>
            <div className='info'>
              <h3>{t('sec7_name1')}: <span>{teacher.firstName}</span></h3>
              <h3>{t('sec7_name2')}: <span>{teacher.lastName}</span></h3>
              <h3>{t('sec7_email')}: <span>{teacher.email}</span></h3>
              <h3>{t('sec7_phone')}: <span>{teacher.telephone}</span></h3>
            </div>
            <img width="300px" height="300px" src={teacher?.image} onError={(e) => {
              e.target.src = "/images/fallBackUser.png";
            }} alt={teacher?.firstName + ' image'} />
          </div>
          <div className='secondary_info'>
            <div className='block'>
              <h3>{t('sec7_about1')}</h3>
              {teacher?.teaching_philosophy ? (
                <p>{teacher.teaching_philosophy}</p>
              ) : (
                <p>No {t('sec7_about1')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about2')}</h3>
              {teacher?.career_summary ? (
                <p>{teacher.career_summary}</p>
              ) : (
                <p>No {t('sec7_about2')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about3')}</h3>
              {teacher?.teaching_methods ? (
                <p>{teacher.teaching_methods}</p>
              ) : (
                <p>No {t('sec7_about3')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about4')}</h3>
              {teacher?.qualification_cert ? (
                <p>{teacher.qualification_cert}</p>
              ) : (
                <p>No {t('sec7_about4')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about5')}</h3>
              {teacher?.teacher_collaboration ? (
                <p>{teacher.teacher_collaboration}</p>
              ) : (
                <p>No {t('sec7_about5')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about6')}</h3>
              {teacher?.classroom_management ? (
                <p>{teacher.classroom_management}</p>
              ) : (
                <p>No {t('sec7_about6')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about7')}</h3>
              {teacher?.behavior_management ? (
                <p>{teacher.behavior_management}</p>
              ) : (
                <p>No {t('sec7_about7')} available</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about8')}</h3>
              {teacher?.additional_info ? (
                <p>{teacher.additional_info}</p>
              ) : (
                <p>No {t('sec7_about8')} available</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TeacherProfile;
