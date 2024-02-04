import React, { useState, useRef, useEffect } from 'react';
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

function Registration() {
  const { t } = useTranslation("authPages/register");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    terms: false,
  });
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const [visible, setVisible] = useState(false);
  const [passwordError, setPassError] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const recaptchaRef = useRef(null);
  const DELAY = 1500;

  const isArabicDir = ["Ar", "Ur"].includes(i18next.language);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (name === "password") {
      if (value.length === 0 || isStrongPassword(value, t) === "") {
        setPassError("");
        return;
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, DELAY);

    return () => clearTimeout(timer);
  }, []);

  const asyncScriptOnLoad = () => {
    setRecaptchaLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!formData.name) return notifyError(t("Error_Required_Name"));
    if (!formData.email) return notifyError(t("Error_Required_Email"));
    if (!isVAlidEmail(formData.email)) return notifyError(t("Error_Invalid_Email_Format"))
    if (!formData.password) return notifyError(t("Error_Required_Password"));
    if (!formData.confirmPassword) return notifyError(t("Error_Required_Confirm_Password"));
    if (!formData.terms) return notifyError(t("Error_Required_Terms"));
    if (formData.password !== formData.confirmPassword) {
      notifyError(t("passwordMatchError"))
      return;
    }

    const errMessage = isStrongPassword(formData.password, t);
    if (errMessage) {
      setPassError(errMessage);
      notifyError(t("Error_Strong_password"))
      return;
    }

    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    try {
      setButtonLoading("registerBtn", true);
      const res = await submitRegister({ ...formData, token });
      if (res.error) {
        notifyError(res.error);
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          profileImage: '',
          terms: false
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
              />
            </div>

            <div className='group'>
              <InputField
                label={t("passwordLabel")}
                type={visible ? "text" : "password"}
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t("confirmPasswordPlaceholder")}
              />
              <div style={isArabicDir
                ? { left: '15px', right: "unset" }
                : { right: '15px', left: "unset" }}
                id="password_eye"
                onClick={() => setVisible((prev) => !prev)}>
                {visible ? <IoEyeOutline /> :
                  <IoEyeOffOutline />}
              </div>
              {passwordError && passwordError.length > 0 && (
                <p id="password_error">{passwordError}</p>
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
            {load && (
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
                size="invisible"
                asyncScriptOnLoad={asyncScriptOnLoad}
                ref={recaptchaRef}
              />)}
            <button disabled={isBtnLoading['registerBtn'] || !recaptchaLoaded} type="submit">{isBtnLoading['registerBtn'] ? t("loadingText") : t("registerButton")}</button>
            <span> {t("haveAccountText")} <Link to={`/${i18next.language}/login`}>{t("loginLinkText")}</Link></span>

          </form>
          <span className='earth_icon'><FaGlobe /></span>
          <div className='shape three'></div>
          <div className='shape four'></div>
        </div>
      </div >
    </main >
  );
}

export default Registration;
