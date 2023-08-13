import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

const TeachersOverview = ({ getTeachersData }) => {
  return (
    <Swiper
      style={{ width: "90%" }}
      spaceBetween={10}
      slidesPerView={3}
      grabCursor={true}
      navigation
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
    >
      {getTeachersData.map(teacher => (
        <SwiperSlide tag='ul' key={teacher.id} >
          <li className='teacher_card'>
            <div className='teacher_content'>
              <div className='imageContainer'>
                <img width="500px" height="500px" className='teacher_image' src={`${teacher.img || "/images/user.png"}`} alt='teacher_image' />
              </div>
              <div className='teacher_group'>
                <h4 className='teacher_name'>{teacher?.name}</h4>
                <span className='teacher_job'>{teacher?.job}</span>
              </div>
              <p className='teacher_brief'>{teacher?.brief}</p>
              <Link className='teacher_link' to={`/pages/Teachers/${teacher.id}`}>View Profile</Link>
            </div>
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TeachersOverview