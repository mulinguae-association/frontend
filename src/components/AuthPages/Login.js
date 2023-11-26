import React, { useState } from 'react';
import "./AuthStyle.scss";
import { submitLogin } from '../../utils/auth-api'; // Replace with your login API function
import { notifyError, notifySuccess } from '../Notify'; // Replace with your notification component
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import { useGlobal } from '../../contexts/AppContext';
import InputField from '../HelperComponents/InputField'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation("authPages/login")
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setUserData } = useAuth();
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonLoading("loginBtn", true);
      const res = await submitLogin(formData);
      if (res.error) {
        notifyError(res.error);
      } else {
        // Clear the form fields
        setFormData({
          email: '',
          password: '',
        });
        notifySuccess("Login successful");
        navigate(`/${i18next.language}/pages/Blogs`);
        const response = await axios.get('/api/auth/profile');
        setUserData(response.data);
      }
    } catch (error) {
      notifyError(error.message);
      console.log(error);
    } finally {
      setButtonLoading("loginBtn", false);
    }
  };

  return (
    <main className='auth_form'>
      <div className='container'>
        <div className='content'>
          <h1>{t("pageTitle")}</h1>
          <form onSubmit={handleSubmit}>
            <div className='group'>
              <label>{t("emailLabel")}</label>
              <InputField
                type="email"
                name="email"
                placeholder={t("emailPlaceholder")}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='group'>
              <label>{t("passwordLabel")}</label>
              <InputField
                type="password"
                name="password"
                placeholder={t("passwordPlaceholder")}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Link to={`/${i18next.language}/forgot-password`}>{t("forgotPasswordLink")}</Link>
            <button disabled={isBtnLoading['loginBtn']} type="submit"> {isBtnLoading['loginBtn'] ? t("loadingText") : t("loginButton")} </button>
            <span> {t("notMemberText")} <Link to={`/${i18next.language}/register`}>{t("registerLinkText")}</Link></span>
          </form>
          <span className='earth_icon'><FaGlobe /></span>
        </div>
      </div>
    </main>
  );
}

export default Login;
