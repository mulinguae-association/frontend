import React, { useState } from 'react';
import { useGlobal } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import InputField from '../HelperComponents/InputField';
import { BiLoaderAlt } from 'react-icons/bi';

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
    address: ''
  });
  const { isBtnLoading } = useGlobal();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'address') {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px'
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
        <div className='content'>
          <InputField
            label={t("teacherForm.fullNameLabel")}
            id="fullName"
            type="text"
            placeholder={t("teacherForm.fullNamePlaceholder")}
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
            required
          />
          <InputField
            label={t("teacherForm.emailLabel")}
            id="email"
            type="email"
            placeholder={t("teacherForm.emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
          <InputField
            id="phoneNumber"
            label={t("teacherForm.phoneNumberLabel")}
            type="tel"
            placeholder={t("teacherForm.phoneNumberPlaceholder")}
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
          />
          <InputField
            id="country"
            label={t("teacherForm.countryLabel")}
            type="text"
            placeholder={t("teacherForm.countryPlaceholder")}
            value={formData.country}
            onChange={handleChange}
            name="country"
            required
          />
          <InputField
            id="languagesSpoken"
            label={t("teacherForm.languagesSpokenLabel")}
            type="text"
            placeholder={t("teacherForm.languagesSpokenPlaceholder")}
            title={t("teacherForm.languagesSpokenTitle")}
            value={formData.languagesSpoken}
            onChange={handleChange}
            name="languagesSpoken"
            required
          />
          <InputField
            id="subjectsTaught"
            label={t("teacherForm.subjectsTaughtLabel")}
            type="text"
            placeholder={t("teacherForm.subjectsTaughtPlaceholder")}
            value={formData.subjectsTaught}
            onChange={handleChange}
            name="subjectsTaught"
            required
          />
          <div>
            <textarea
              id="address"
              name="address"
              autoComplete='off'
              placeholder={t("teacherForm.addressLabel")}
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
        </div>
        <button className={`${isBtnLoading["teacher"] ? "disabled" : ""}`} disabled={isBtnLoading["teacher"]} type="submit">
          {isBtnLoading["teacher"] ? <BiLoaderAlt fontSize={20} className='spin-loader' /> : t("teacherForm.cvUploadButtonText")}
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
