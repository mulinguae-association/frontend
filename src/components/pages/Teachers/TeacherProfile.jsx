import React from 'react';
import { useParams } from 'react-router-dom';
import "./Teachers.scss";
import { useTranslation } from 'react-i18next';
import { fetchTeacherById } from '../../../apis/apiUtility';
import { useQuery } from 'react-query';
import { BiLoaderAlt } from 'react-icons/bi';

const TeacherProfile = () => {
  const { t } = useTranslation('pages/teachers');
  const { teacherId } = useParams();
  const { data: teacher, isLoading, isError } = useQuery(["getTeacherById"], () => fetchTeacherById(teacherId.split("_")[1]), {
    cacheTime: Infinity
  });

  if (isLoading) {
    return <div className='not-found'><BiLoaderAlt className='spin-loader' color='darkblue' size={50} /></div>;
  }

  if (isError) {
    return <div className='not-found'>{t('notFound')}</div>;
  }

  const teacherImg = typeof teacher?.image === "object"
    ? URL.createObjectURL(teacher?.image)
    : teacher?.image;
  return (
    <main className='page_content teacher_profile'>
      <div className='container'>
        <section className='teacher_content'>
          <header className='main_info'>
            <div className='info'>
              <h3>{t('sec7_name1')}: <span>{teacher?.firstName}</span></h3>
              <h3>{t('sec7_name2')}: <span>{teacher?.lastName}</span></h3>
              <h3>{t('sec7_email')}: <span>{teacher?.email}</span></h3>
              <h3>{t('sec7_phone')}: <span>{teacher?.telephone}</span></h3>
            </div>
            <img
              width="250px"
              height="250px"
              src={teacherImg}
              onError={(e) => {
                e.target.src = "/images/fallBackUser.png";
              }}
              alt={`${teacher?.firstName}_image`}
            />
          </header>
          <article className='secondary_info'>
            <div className='block'>
              <h3>{t('sec7_about1')}</h3>
              {teacher?.teaching_philosophy ? (
                <p>{teacher.teaching_philosophy}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about1') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about2')}</h3>
              {teacher?.career_summary ? (
                <p>{teacher.career_summary}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about2') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about3')}</h3>
              {teacher?.teaching_methods ? (
                <p>{teacher.teaching_methods}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about3') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about4')}</h3>
              {teacher?.qualification_cert ? (
                <p>{teacher.qualification_cert}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about4') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about5')}</h3>
              {teacher?.teacher_collaboration ? (
                <p>{teacher.teacher_collaboration}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about5') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about6')}</h3>
              {teacher?.classroom_management ? (
                <p>{teacher.classroom_management}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about6') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about7')}</h3>
              {teacher?.behavior_management ? (
                <p>{teacher.behavior_management}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about7') })}</p>
              )}
            </div>
            <div className='block'>
              <h3>{t('sec7_about8')}</h3>
              {teacher?.additional_info ? (
                <p>{teacher.additional_info}</p>
              ) : (
                <p>{t('noAboutAvailable', { field: t('sec7_about8') })}</p>
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default TeacherProfile;
