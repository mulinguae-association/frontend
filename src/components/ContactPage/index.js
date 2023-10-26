import React, { useState } from 'react';
import "./index.scss";
import StudentForm from './StudentForm';
import TeacherForm from './TeacherForm';
import { submitInfo } from '../../utils/contact-api';
import { useGlobal } from '../../contexts/AppContext';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import NotificationPopup from '../HelperComponents/NotificationPopup';
import { notifyError } from '../Notify';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation("contact");

  const [isTeacher, setIsTeacher] = useState(true);
  const { setButtonLoading } = useGlobal();
  const { notificationPopup, setNotificationPopup } = useGlobal();

  const handleSubmit = async (e, formData, userType, setFormData) => {
    e.preventDefault();
    try {
      setButtonLoading(userType, true);
      const data = await submitInfo(formData, userType);
      if (data) {
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          cv: null,
          country: '',
          languagesSpoken: '',
          age: '',
          subjectsTaught: '',
          address: '',
        });
        setNotificationPopup({
          message: t("messages.submissionMessage"),
          icon: <IoMdCheckmarkCircle />,
        });
      }
    } catch (err) {
      setButtonLoading(userType, false);
      notifyError(err.message);
    } finally {
      setButtonLoading(userType, false);
    }
  };

  return (
    <main className='contact'>
      <h1>{t("titles.mainTitle")}</h1>
      <div className='contact_content'>
        <div className="user-type-buttons">
          <button onClick={() => setIsTeacher(true)}>
            {t("buttons.teacherButton")}
          </button>
          <div className="vertical-line"></div>
          <button onClick={() => setIsTeacher(false)}>
            {t("buttons.studentButton")}
          </button>
        </div>
        {isTeacher
          ? <TeacherForm handleSubmit={handleSubmit} />
          : <StudentForm handleSubmit={handleSubmit} />}
      </div>
      {notificationPopup && (
        <NotificationPopup message={t("messages.submissionMessage")}
          setNotification={setNotificationPopup} />
      )}
    </main>
  );
};

export default Contact;
