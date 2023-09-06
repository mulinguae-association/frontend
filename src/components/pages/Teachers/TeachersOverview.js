import { React, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { deleteTeacher } from '../../../utils/apiUtility';
import { AppContext } from '../../../contexts/AppContext';
import EditTeacherForm from '../../Dashboard/EditTeacherForm';
import { notifyError, notifySuccess } from '../../Notify';

const TeachersOverview = ({ t }) => {
  const { teachers, setTeachers, getTeachers } = useContext(AppContext)
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    getTeachers()
  }, []);

  const handleEditTeacher = (teacher) => {
    if (editingTeacher && editingTeacher._id === teacher._id) {
      // If the same teacher is being edited again, close the edit form
      setEditingTeacher(null);
    } else {
      // Otherwise, open the edit form for the selected teacher
      setEditingTeacher(teacher);
    }
  };
  const handleUpdateTeacher = (updatedTeacher) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher._id === updatedTeacher._id ? updatedTeacher : teacher
    );
    setTeachers(updatedTeachers);
    getTeachers()
    // Clear the editingTeacher state to exit edit mode
    setEditingTeacher(null);
  }

  const handleDeleteTeacher = async (teacherId) => {
    try {
      const res = await deleteTeacher(teacherId)
      console.log(res)
      res.success ? notifySuccess("successfuly deleted teacher") : notifyError("Faild deleted teacher")
      getTeachers()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Swiper
      style={{ width: "90%" }}
      slidesPerView={3}
      grabCursor={true}
      navigation
      pagination
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
    >
      {teachers?.map(teacher => (
        <SwiperSlide tag='ul' key={teacher._id}>
          <li className='teacher_card'>
            <div className='teacher_content'>
              {!editingTeacher || editingTeacher._id !== teacher._id ?
                <>
                  <div className='imageContainer'>
                    <img width="500px" height="500px" className='teacher_image' src={teacher.image ? `${teacher.image}` : "/images/fallBackUser.png"} alt='teacher_image'
                      onError={(e) => {
                        e.target.src = "/images/fallBackUser.png";
                      }}
                    />
                  </div>
                  <div className='teacher_group'>
                    <h4 className='teacher_name'>{teacher?.firstName} {teacher?.lastName}</h4>
                    <span className='teacher_job'>{teacher?.jobBrief}</span>
                  </div>
                  <p className='teacher_brief scroll'>{teacher?.aboutTeacher}</p>
                </>
                : <EditTeacherForm teacher={editingTeacher} onUpdate={handleUpdateTeacher} />
              }
              <Link className='teacher_link' to={`/pages/Teachers/${teacher.firstName}${teacher._id}`}>{t("sec6_link1")}</Link>
              <button className='deleteBtn' onClick={() => handleDeleteTeacher(teacher._id)}>x</button>
              <button className='editBtn' onClick={(e) => handleEditTeacher(teacher)}>
                <img height={"64px"} src='/images/icons/edit.png' alt='edit teacher card' />
              </button>
            </div>
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TeachersOverview