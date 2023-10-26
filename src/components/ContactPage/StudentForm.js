import React, { useState } from 'react';
import { useGlobal } from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';

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
      <form method="post" enctype="multipart/form-data" onSubmit={(e) => handleSubmit(e, formData, "student", setFormData)}>
        <div>
          <label htmlFor="fullName">{t("studentForm.nameLabel")}</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder={t("studentForm.fullNamePlaceholder")}
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">{t("studentForm.emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("studentForm.emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">{t("studentForm.phoneNumberLabel")}</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder={t("studentForm.phoneNumberPlaceholder")}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">{t("studentForm.countryLabel")}</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder={t("studentForm.countryPlaceholder")}
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">{t("studentForm.ageLabel")}</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder={t("studentForm.agePlaceholder")}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{t("studentForm.languagesSpokenLabel")}</label>
          <input
            type="text"
            id="languagesSpoken"
            name="languagesSpoken"
            placeholder={t("studentForm.languagesSpokenPlaceholder")}
            title="Example: English, Spanish, French"
            value={formData.languagesSpoken}
            onChange={handleChange}
            required
          />
        </div>
        <button disabled={isBtnLoading["student"]} type="submit">{isBtnLoading["student"] ? "loading..." : t("studentForm.submitButton")}</button>
      </form>
    </div>
  );
};

export default StudentForm;
