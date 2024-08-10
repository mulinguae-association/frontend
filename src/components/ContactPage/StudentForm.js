import React, { useState } from 'react';
import { useGlobal } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import InputField from '../HelperComponents/InputField';
import { BiLoaderAlt } from 'react-icons/bi';

const StudentForm = ({ handleSubmit }) => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    age: '',
    languagesSpoken: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { isBtnLoading } = useGlobal();

  return (
    <div className='form_container'>
      <h2>{t("titles.studentFormTitle")}</h2>
      <form method="post" encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, formData, "student", setFormData)}>
        <div className='content'>
          <InputField
            label={t("studentForm.nameLabel")}
            type="text"
            placeholder={t("studentForm.fullNamePlaceholder")}
            value={formData.fullName}
            onChange={handleChange}
            id="fullName"
            name="fullName"
            required
          />

          <InputField
            label={t("studentForm.emailLabel")}
            type="email"
            placeholder={t("studentForm.emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            required
          />

          <InputField
            label={t("studentForm.phoneNumberLabel")}
            type="tel"
            placeholder={t("studentForm.phoneNumberPlaceholder")}
            value={formData.phoneNumber}
            onChange={handleChange}
            id="phoneNumber"
            name="phoneNumber"
          />

          <InputField
            label={t("studentForm.countryLabel")}
            type="text"
            placeholder={t("studentForm.countryPlaceholder")}
            value={formData.country}
            onChange={handleChange}
            id="country"
            name="country"
            required
          />

          <InputField
            label={t("studentForm.ageLabel")}
            type="number"
            placeholder={t("studentForm.agePlaceholder")}
            value={formData.age}
            onChange={handleChange}
            id="age"
            name="age"
            required
          />

          <InputField
            label={t("studentForm.languagesSpokenLabel")}
            type="text"
            placeholder={t("studentForm.languagesSpokenPlaceholder")}
            title={t("studentForm.languagesSpokenTitle")}
            value={formData.languagesSpoken}
            onChange={handleChange}
            id="languagesSpoken"
            name="languagesSpoken"
            required
          />
        </div>
        <button className={isBtnLoading["student"] ? "disabled" : ""} disabled={isBtnLoading["student"]} type="submit">
          {isBtnLoading["student"] ? <BiLoaderAlt fontSize={20} className='spin-loader' /> : t("studentForm.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
