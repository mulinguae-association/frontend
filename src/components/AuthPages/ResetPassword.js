// ResetPassword.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGlobe } from 'react-icons/fa';
import { notifyError } from '../Notify';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useGlobal } from '../../contexts/AppContext';

function ResetPassword() {
  const { t } = useTranslation("authPages/resetPass")
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const { id, token } = useParams();
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a request to your server to reset the password
    try {
      setButtonLoading("resetBtn", true);
      const res = await axios.post(`/api/auth/reset-password/${id}/${token}`, {
        password: password,
        confirmPassword: confirmPassword,
      })
      if (res.status === 200) {
        alert("successfuly reset password")
        navigate(`/${i18next.language}/login`)
      } else {
        notifyError(res.message)
      }

      setResetSuccessful(true);
    } catch (error) {
      notifyError(error.response.data.message)
    } finally {
      setButtonLoading("resetBtn", false);
    }
  };

  return (
    <div className="reset-password auth_form">
      <div className='container'>
        <div className='content'>

          <h2>{t("pageTitle")}</h2>
          {resetSuccessful ? (
            <p>{t("successMessage")}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='group'>
                <label htmlFor="password">{t("newPasswordLabel")}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder={t("newPasswordPlaceholder")}
                />
              </div>
              <div className='group'>
                <label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder={t("confirmPasswordPlaceholder")}
                />
              </div>
              <button disabled={isBtnLoading['resetBtn']} type="submit">
                {isBtnLoading['resetBtn'] ? t("loadingText") : t("resetButton")}</button>
            </form>
          )}
          <span className='earth_icon'><FaGlobe /></span>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
