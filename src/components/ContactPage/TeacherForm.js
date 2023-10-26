import React, { useState } from 'react';
import { useGlobal } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';

const TeacherForm = ({ handleSubmit }) => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    cv: null,
    country: '',
    languagesSpoken: '',
    subjectsTaught: '',
    address: '',
  });
  const { isBtnLoading } = useGlobal();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'address') {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
    setFormData((prevData) => {
      if (type === 'file') {
        return { ...prevData, [name]: e.target.files[0] };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  return (
    <div className='form_container'>
      <h2>{t("titles.teacherFormTitle")}</h2>
      <form method="post" action='/submit-info' encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, formData, "teacher", setFormData)}>
        <div>
          <label htmlFor="name">{t("teacherForm.nameLabel")}</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder={t("teacherForm.fullNamePlaceholder")}
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">{t("teacherForm.emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("teacherForm.emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">{t("teacherForm.phoneNumberLabel")}</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder={t("teacherForm.phoneNumberPlaceholder")}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">{t("teacherForm.countryLabel")}</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder={t("teacherForm.countryPlaceholder")}
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{t("teacherForm.languagesSpokenLabel")}</label>
          <input
            type="text"
            id="languagesSpoken"
            name="languagesSpoken"
            placeholder={t("teacherForm.languagesSpokenPlaceholder")}
            title="Example: English, Spanish, French"
            value={formData.languagesSpoken}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subjectsTaught">{t("teacherForm.subjectsTaughtLabel")}</label>
          <input
            type="text"
            id="subjectsTaught"
            name="subjectsTaught"
            placeholder={t("teacherForm.subjectsTaughtPlaceholder")}
            value={formData.subjectsTaught}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">{t("teacherForm.addressLabel")}</label>
          <textarea
            id="address"
            name="address"
            placeholder={t("teacherForm.addressPlaceholder")}
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='group uploadCv'>
          <label htmlFor="cv">{formData.cv ? formData.cv.name : t("teacherForm.uploadCvLabel")}</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange}
          />
        </div>
        <button disabled={isBtnLoading["teacher"]} type="submit">
          {isBtnLoading["teacher"] ? t("buttons.loadingText") : t("teacherForm.cvUploadButtonText")}
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
