import "./AuthStyle.scss";
import React, { useState } from 'react';
import { submitRegister } from '../../utils/auth-api';
import { notifyError, notifySuccess } from '../Notify';
import { useNavigate } from 'react-router';
import { FaGlobe } from 'react-icons/fa';
import { useGlobal } from "../../contexts/AppContext";
import InputField from '../HelperComponents/InputField'; // Import your InputField component
import i18next from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Registration() {
  const { t } = useTranslation("authPages/register")
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '', // Initialize as an empty string
  });
  const { isBtnLoading, setButtonLoading } = useGlobal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      notifyError(t("passwordLengthError"))
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notifyError(t("passwordMatchError"))
      return;
    }

    try {
      setButtonLoading("registerBtn", true);
      const res = await submitRegister(formData);
      if (res.error) {
        notifyError(res.error);
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          profileImage: '',
        });
        notifySuccess(res.message + " " + formData.name);
        navigate(`/${i18next.language}/login`);
      }
    } catch (error) {
      notifyError(error.message);
      setButtonLoading("registerBtn", false);
      console.log(error);
    } finally {
      setButtonLoading("registerBtn", false);
    }
  };

  return (
    <main className='auth_form'>
      <div className='container'>
        <div className='content'>
          <h1>{t("registerTitle")}</h1>
          <form onSubmit={handleSubmit}>
            <div className='group'>
              <InputField
                label={t("nameLabel")}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t("namePlaceholder")}
              />
            </div>

            <div className='group'>
              <InputField
                label={t("emailLabel")}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("emailPlaceholder")}
                required
              />
            </div>

            <div className='group'>
              <InputField
                label={t("passwordLabel")}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t("passwordPlaceholder")}
              />
            </div>

            <div className='group'>
              <InputField
                label={t("confirmPasswordLabel")}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t("confirmPasswordPlaceholder")}
              />
            </div>
            <button disabled={isBtnLoading['registerBtn']} type="submit">{isBtnLoading['registerBtn'] ? t("loadingText") : t("registerButton")}</button>
            <span> {t("haveAccountText")} <Link to={`/${i18next.language}/login`}>{t("loginLinkText")}</Link></span>

          </form>
          <span className='earth_icon'><FaGlobe /></span>
        </div>
      </div>
    </main>
  );
}

export default Registration;
