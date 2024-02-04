import React, { useState } from 'react';
import axios from 'axios';
import { notifyError, notifySuccess } from '../Notify';
import { Link } from 'react-router-dom';
import { FaGlobe } from "react-icons/fa";
import { useGlobal } from '../../contexts/AppContext';
import InputField from '../HelperComponents/InputField'; // Import your InputField component
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const { t } = useTranslation("authPages/forgotPass")
  const lang = i18next.language
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonLoading("resetEmail", true);
      const res = await axios.post("/api/auth/forgot-password", { email, lang });
      if (res.status === 200) {
        notifySuccess(res.data.message);
      } else {
        notifyError(res.data.error);
        console.log(res.data.error);
      }
      setEmailSent(true);
    } catch (error) {
      console.log(error)
      notifyError(error.response.data.error);
      setButtonLoading("resetEmail", false);
    } finally {
      setButtonLoading("resetEmail", false);
    }
  };

  return (
    <main className="auth_form forgot-password">
      <div className='container'>
        <div className='content'>
          <h2>{t("pageTitle")}</h2>
          {emailSent ? (
            <p>{t("instructions")} <b />
              <a target='_blank' rel='noreferrer' href='https://mail.google.com/mail/u/?authuser=user@gmail.com'>{t("gmailLink")}</a>
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <p>{t("provideEmailPrompt")}</p>
              <div className='group'>
                <label>{t("emailLabel")}</label>
                <InputField
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder={t("emailPlaceholder")}
                  required
                />
              </div>
              <button disabled={isBtnLoading['resetEmail']} type="submit">{isBtnLoading['resetEmail'] ? t("loading") : t("sendResetEmail")}</button>
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
