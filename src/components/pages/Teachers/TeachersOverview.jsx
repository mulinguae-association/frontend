import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EditTeacherForm from "../../Dashboard/EditTeacherForm";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import handleError from "../../../utils/handleError";
import { BiLoaderCircle } from "react-icons/bi";
import i18n from "../../../i18n";
import { useDeleteTeacherMutation } from "../../../apis/mutations/teachers/deleteTeacher";
import { useQuery } from "react-query";
import { fetchTeachers } from "../../../apis/apiUtility";
const ConfirmationModal = React.lazy(() => import("../../ConfirmationModal"));

const TeachersOverview = ({ t }) => {
  const [showModal, setShowModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const { isAuth, userData } = useAuth();
  const arLang = i18n.language === "ar";
  const { mutate: handleDeleteTeacher } = useDeleteTeacherMutation();

  const {
    data: teachers,
    isLoading,
    isError,
    error,
  } = useQuery(["getTeachers"], fetchTeachers, {
    cacheTime: Infinity,
  });

  // Function to sort teachers by their first name alphabetically
  const sortedTeachers = teachers
    ? teachers.sort((a, b) => a.firstName.localeCompare(b.firstName))
    : [];

  const handleEditTeacher = (teacher) => {
    if (editingTeacher && editingTeacher._id === teacher._id) {
      setEditingTeacher(null);
    } else {
      setEditingTeacher(teacher);
    }
  };

  const confirmDeleteTeacher = (teacherId) => {
    handleDeleteTeacher(teacherId);
    setShowModal(false);
    setTeacherToDelete(null);
  };

  const handleDeleteClick = (teacherId) => {
    setTeacherToDelete(teacherId);
    setShowModal(true);
  };

  if (isError) {
    return handleError(error);
  }
  if (isLoading) {
    return <BiLoaderCircle className="spin-loader" size={50} />;
  }

  return (
    <>
      <Swiper
        slidesPerView={3}
        grabCursor={true}
        key={arLang}
        navigation
        pagination
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
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
        dir={arLang ? "rtl" : "ltr"}
      >
        {sortedTeachers && sortedTeachers.length > 0 ? (
          sortedTeachers.map((teacher) => (
            <SwiperSlide tag="ul" key={teacher._id}>
              <li className="teacher_card">
                <div className="teacher_content">
                  {!editingTeacher || editingTeacher._id !== teacher?._id ? (
                    <>
                      <div className="imageContainer">
                        <img
                          width="250px"
                          height="250px"
                          className="teacher_image"
                          src={
                            teacher?.image && typeof teacher.image === "object"
                              ? URL.createObjectURL(teacher?.image)
                              : typeof teacher.image === "string"
                              ? teacher?.image
                              : "/images/fallBackUser.png"
                          }
                          alt="teacher_image"
                          onError={(e) => {
                            e.target.src = "/images/fallBackUser.png";
                          }}
                        />
                      </div>
                      <div className="teacher_group">
                        <h4 className="teacher_name">
                          {teacher?.firstName} {teacher?.lastName}
                        </h4>
                        <span className="teacher_job">{teacher?.jobBrief}</span>
                      </div>
                      <p className="teacher_brief scroll">
                        {teacher?.aboutTeacher}
                      </p>
                      <Link
                        state={{ teacherData: teacher }}
                        className="teacher_link"
                        to={`${teacher?.firstName}_${teacher?._id}`}
                      >
                        {t("sec6_link1")}
                      </Link>
                    </>
                  ) : (
                    <EditTeacherForm
                      teacher={editingTeacher}
                      onEdit={setEditingTeacher}
                    />
                  )}
                  {isAuth && ["admin", "superadmin"].includes(userData?.role) && (
                    <>
                      <button
                        className="deleteBtn"
                        onClick={() => handleDeleteClick(teacher._id)}
                      >
                        x
                      </button>
                      <button
                        style={arLang ? { left: "20px" } : null}
                        className="editBtn"
                        onClick={() => handleEditTeacher(teacher)}
                      >
                        <img
                          height={"64px"}
                          src="/images/icons/edit.png"
                          alt="edit teacher card"
                        />
                      </button>
                    </>
                  )}
                </div>
              </li>
            </SwiperSlide>
          ))
        ) : (
          <div className="no_teachers">{t("sec7_noTeachers")}</div>
        )}
      </Swiper>
      {showModal && (
        <React.Suspense fallback="Loading...">
          <ConfirmationModal
            message={`Are you sure you want to delete this teacher?`}
            onConfirm={() => confirmDeleteTeacher(teacherToDelete)}
            onCancel={() => setShowModal(false)}
            isLoading={false}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default TeachersOverview;
