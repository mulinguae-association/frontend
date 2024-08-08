import React, { useEffect, useState } from 'react';
import "./AuthStyle.scss";
import { submitLogin } from '../../apis/auth-api';
import { notifyError, notifySuccess } from '../Notify';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import { useGlobal } from '../../contexts/AppContext';
import InputField from '../HelperComponents/InputField'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import logError from '../../utils/logError';
import { useQueryClient } from 'react-query';

function Login() {
  const { t } = useTranslation("authPages/login")
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { userData } = useAuth();
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) navigate(`/${i18next.language}/pages/Blogs`);
  }, [userData, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const checkUserEntity = !formData.email || !formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonLoading("loginBtn", true);
      const res = await submitLogin(formData);
      if (res.error) {
        notifyError(res.error);
        return;
      }
      // Clear the form fields
      setFormData({
        email: '',
        password: ''
      });
      notifySuccess("Login successful");
      queryClient.setQueryData("userProfile", res);
      navigate(`/${i18next.language}/pages/Blogs`);
    } catch (error) {
      notifyError(error.message);
      logError(error.message);
    } finally {
      setButtonLoading("loginBtn", false);
    }
  };
  const isBtnDisabled = checkUserEntity || isBtnLoading['loginBtn'];
  return (
    <main className='auth_form'>
      <div className='container'>
        <div className='content'>
          <h1>{t("pageTitle")}</h1>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='group'>
              <label htmlFor='email'>{t("emailLabel")}</label>
              <InputField
                type="email"
                name="email"
                id="email"
                placeholder={t("emailPlaceholder")}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='group'>
              <label htmlFor='password'>{t("passwordLabel")}</label>
              <InputField
                id="password"
                type="password"
                name="password"
                placeholder={t("passwordPlaceholder")}
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="on"
                required
              />
            </div>
            <Link to={`/${i18next.language}/forgot-password`}>{t("forgotPasswordLink")}</Link>
            <button
              type="submit"
              className={`btn ${isBtnDisabled ? 'disabled' : ''}`}
              disabled={isBtnDisabled}
            >
              {isBtnLoading['loginBtn'] ? t("loadingText") : t("loginButton")}
            </button>
            <span> {t("notMemberText")} <Link to={`/${i18next.language}/register`}>{t("registerLinkText")}</Link></span>
          </form>
          <span className='earth_icon'><FaGlobe /></span>
          <div className='shape three'></div>
          <div className='shape four'></div>
        </div>
      </div>
    </main>
  );
}

export default Login;
