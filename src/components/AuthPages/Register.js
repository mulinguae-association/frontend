import React, { useState, useRef, useEffect } from 'react';
import "./AuthStyle.scss";
import { submitRegister } from '../../utils/auth-api';
import { notifyError, notifySuccess } from '../Notify';
import { useNavigate } from 'react-router';
import { FaGlobe } from 'react-icons/fa';
import { useGlobal } from "../../contexts/AppContext";
import InputField from '../HelperComponents/InputField';
import i18next from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { isVAlidEmail, isStrongPassword } from "../../utils/strongChecker";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from '../../contexts/AuthContext';

function Registration() {
  const { t } = useTranslation("authPages/register");
  const { t: global } = useTranslation("global");
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [visible, setVisible] = useState(false);
  const recaptchaRef = useRef(null);

  const isArabicDir = ["Ar", "Ur"].includes(i18next.language);

  useEffect(() => {
    if (userData) {
      navigate(`/${i18next.language}/pages/Blogs`);
    }
  }, [userData, navigate]);

  useEffect(() => {
    return () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    };
  }, []);

  const validateEmail = (email) => {
    if (!isVAlidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: global("Error_Invalid_Email_Format") }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
      return true;
    }
  };

  const validatePassword = (password) => {
    const errMessage = isStrongPassword(password, global);
    if (errMessage) {
      setErrors((prev) => ({ ...prev, password: errMessage }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
      return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (name === "email") validateEmail(value);
    if (name === "password") validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) return notifyError(global("Error_Required_Name"));
    if (!formData.email) return notifyError(global("Error_Required_Email"));
    if (!validateEmail(formData.email)) return;
    if (!formData.password) return notifyError(global("Error_Required_Password"));
    if (!formData.confirmPassword) return notifyError(global("Error_Required_Confirm_Password"));
    if (!formData.terms) return notifyError(global("Error_Required_Terms"));
    if (formData.password !== formData.confirmPassword) return notifyError(global("passwordMatchError"));
    if (!validatePassword(formData.password)) return;

    try {
      setButtonLoading("registerBtn", true);
      const token = await recaptchaRef.current.executeAsync();
      const res = await submitRegister({ ...formData, token });
      if (res.error) {
        notifyError(res.error);
        return;
      }
      console.log(res);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      });
      notifySuccess(res.message + " " + formData.name);
      navigate(`/${i18next.language}/login`);
    } catch (error) {
      notifyError(error.message);
    } finally {
      setButtonLoading("registerBtn", false);
    }
  };

  const isBtnDisabled = !formData.name
    || !formData.email
    || !formData.password
    || !formData.confirmPassword
    || !formData.terms
    || errors.email
    || errors.password
    || isBtnLoading['registerBtn']

  return (
    <main className='auth_form'>
      <div className='container'>
        <div className='content'>
          <h1>{t("registerTitle")}</h1>
          <form onSubmit={handleSubmit}>
            <div className='group'>
              <InputField
                label={t("nameLabel")}
                id="name"
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
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("emailPlaceholder")}
              />
              {errors.email && (
                <p className='error-msg'>{errors.email}</p>
              )}
            </div>

            <div className='group'>
              <InputField
                label={t("passwordLabel")}
                type={visible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t("passwordPlaceholder")}
              />
            </div>

            <div className='group password'>
              <InputField
                label={t("confirmPasswordLabel")}
                type={visible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t("confirmPasswordPlaceholder")}
              />
              <div
                style={isArabicDir ? { left: '15px', right: "unset" } : { right: '15px', left: "unset" }}
                id="password_eye"
                onClick={() => setVisible((prev) => !prev)}
              >
                {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
              {errors.password && (
                <p className='error-msg'>{errors.password}</p>
              )}
            </div>

            <div className='group termsAgreement'>
              <input
                type="checkbox"
                id="termsAgreement"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
              />
              <label htmlFor="termsAgreement">
                {t("Label_Agree_To")}
                <Link to={`/${i18next.language}/`}>{t("Text_The_Terms")}</Link>
                {t("Text_and")}
                <Link to={`/${i18next.language}/privacy-policy`}>{t("Text_Privacy_Policy")}</Link>
              </label>
            </div>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              ref={recaptchaRef}
            />
            <button
              className={`btn ${isBtnDisabled ? "disabled" : ""}`}
              disabled={isBtnDisabled}
              type="submit"
            >
              {isBtnLoading['registerBtn'] ? t("loadingText") : t("registerButton")}
            </button>
            <span> {t("haveAccountText")} <Link to={`/${i18next.language}/login`}>{t("loginLinkText")}</Link></span>
          </form>
          <span className='earth_icon'><FaGlobe /></span>
          <div className='shape three'></div>
          <div className='shape four'></div>
        </div>
      </div>
    </main>
  );
}

export default Registration;
