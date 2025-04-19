import React, { useState } from 'react';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../Notify';
import { Link } from 'react-router-dom';
import { FaGlobe } from "react-icons/fa";
import { useGlobal } from '../../../contexts/AppContext';
import InputField from '../../HelperComponents/InputField'; // Import your InputField component
import "../styles/AuthStyle.scss";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { isVAlidEmail } from '../../../utils/strongChecker';

function ForgotPassword() {
  const { t } = useTranslation("authPages/forgotPass");
  const { t: global } = useTranslation("global");
  const lang = i18next.language;

  const [formState, setFormState] = useState({
    email: '',
    emailSent: false,
    error: '',
  });

  const { isBtnLoading, setButtonLoading } = useGlobal();

  const handleInputChange = (e) => {
    const { value } = e.target;
    const error = !isVAlidEmail(value) ? global("Error_Invalid_Email_Format") : "";
    setFormState((prevState) => ({
      ...prevState,
      email: value,
      error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonLoading("resetEmail", true);
      const res = await axios.post("/api/auth/forgot-password", { email: formState.email, lang });
      if (res.status === 200) {
        notifySuccess(res.data.message);
        setFormState((prevState) => ({
          ...prevState,
          emailSent: true,
        }));
      } else {
        notifyError(res.data.error);
      }
    } catch (error) {
      notifyError(error.response.data.error);
    } finally {
      setButtonLoading("resetEmail", false);
    }
  };

  const isBtnDisabled = !formState.email || formState.error || isBtnLoading['resetEmail'];

  return (
    <main className="auth_form forgot-password">
      <div className='container'>
        <div className='content'>
          <h2>{t("pageTitle")}</h2>
          {formState.emailSent ? (
            <p>{t("instructions")} <b />
              <a target='_blank' rel='noreferrer' href='https://mail.google.com/mail/u/?authuser=user@gmail.com'>{t("gmailLink")}</a>
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <p>{t("provideEmailPrompt")}</p>
              <div className='group'>
                <label htmlFor='email'>{t("emailLabel")}</label>
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder={t("emailPlaceholder")}
                  required
                />
                {formState.error && <p className="error-msg">{formState.error}</p>}
              </div>
              <button
                type="submit"
                className={`${isBtnDisabled ? 'disabled' : ''}`}
                disabled={isBtnDisabled}>
                {isBtnLoading['resetEmail'] ? t("loading") : t("sendResetEmail")}
              </button>
            </form>
          )}
          <span className='earth_icon'><FaGlobe /></span>
          <div className='shape three'></div>
          <div className='shape four'></div>
        </div>
      </div>
      <p>{t("noAccount")} <Link to={`/${i18next.language}/register`}>{t("signUpLink")}</Link></p>
    </main>
  );
}

export default ForgotPassword;
