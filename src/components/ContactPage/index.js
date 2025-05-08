import React, { useState } from 'react';
import "./index.scss";
import StudentForm from './StudentForm';
import TeacherForm from './TeacherForm';
import { submitInfo } from '../../apis/contact-api';
import { useGlobal } from '../../contexts/AppContext';
import { notifyError } from '../Notify';
import { useTranslation } from 'react-i18next';
import ContactInfo from './ContactInfo';
import TabHeader from './TabHeader';

const Contact = () => {
  const { t } = useTranslation("contact");
  const [activeTab, setActiveTab] = useState('teacher');
  const { setButtonLoading, setNotificationPopup } = useGlobal();
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
          message: ''
        });
        setNotificationPopup({ message: t("messages.submissionMessage") });
      }
    } catch (err) {
      setButtonLoading(userType, false);
      notifyError(err.message);
    } finally {
      setButtonLoading(userType, false);
    }
  };
  return (
    <>
      <main className='contact'>
        <div className='hero-content'>
          <h1 className='hero-subtitle'>{t("titles.mainTitle")}</h1>
          <p className='hero-description'>{t("titles.subHeading") || "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}</p>
        </div>
        <ContactInfo />
        <div className='container'>
          <div className='contact_content'>
            <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'teacher'
              ? <TeacherForm handleSubmit={handleSubmit} />
              : <StudentForm handleSubmit={handleSubmit} />}
            <div className='shape three'></div>
            <div className='shape four'></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;

