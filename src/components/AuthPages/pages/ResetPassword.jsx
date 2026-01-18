import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaGlobe } from "react-icons/fa";
import { notifyError, notifySuccess } from "../../Notify";
import i18next from "i18next";
import "../styles/AuthStyle.scss";
import { useTranslation } from "react-i18next";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { isStrongPassword } from "../../../utils/strongChecker";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function ResetPassword() {
  const { t } = useTranslation("authPages/resetPass");
  const { id, token } = useParams();
  const navigate = useNavigate();
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const isArabicDir = ["ar", "ur"].includes(i18next.language);

  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
    visible: false,
    resetSuccessful: false,
    passError: "",
  });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    const errMessage = isStrongPassword(value, t);
    setFormState((prevState) => ({
      ...prevState,
      password: value,
      passError: errMessage || "",
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      confirmPassword: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormState((prevState) => ({
      ...prevState,
      visible: !prevState.visible,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formState;

    if (!password || !confirmPassword) {
      notifyError(t("missingFieldsError"));
      return;
    }

    try {
      setButtonLoading("resetBtn", true);
      const res = await axios.post(`/api/auth/reset-password/${id}/${token}`, {
        password,
        confirmPassword,
      });
      if (res.status === 200) {
        setFormState((prevState) => ({
          ...prevState,
          resetSuccessful: true,
        }));
        notifySuccess(t("resetSuccessMessage"));
        setTimeout(() => {
          navigate(`/${i18next.language}/login`);
        }, 3000);
      } else {
        notifyError(res.data.message);
      }
    } catch (error) {
      notifyError(error.response.data.message);
    } finally {
      setButtonLoading("resetBtn", false);
    }
  };

  const isBtnDisabled =
    !formState.password ||
    !formState.confirmPassword ||
    formState.passError ||
    isBtnLoading["resetBtn"];

  return (
    <div className="reset-password auth_form">
      <div className="container">
        <div className="content">
          <h2>{t("pageTitle")}</h2>
          {formState.resetSuccessful ? (
            <p>{t("successMessage")}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="group">
                <label htmlFor="password">{t("newPasswordLabel")}</label>
                <input
                  type={formState.visible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handlePasswordChange}
                  required
                  placeholder={t("newPasswordPlaceholder")}
                />
                {formState.passError && (
                  <p className="error-msg">{formState.passError}</p>
                )}
              </div>
              <div className="group password">
                <label htmlFor="confirmPassword">
                  {t("confirmPasswordLabel")}
                </label>
                <input
                  type={formState.visible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder={t("confirmPasswordPlaceholder")}
                />
                <div
                  style={
                    isArabicDir
                      ? { left: "15px", right: "unset", top: "42px" }
                      : { right: "15px", left: "unset", top: "42px" }
                  }
                  id="password_eye"
                  onClick={togglePasswordVisibility}
                >
                  {formState.visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
              <button
                className={`${isBtnDisabled ? "disabled" : ""}`}
                disabled={isBtnDisabled}
                type="submit"
              >
                {isBtnLoading["resetBtn"] ? t("loadingText") : t("resetButton")}
              </button>
            </form>
          )}
          <span className="earth_icon">
            <FaGlobe />
          </span>
          <div className="shape three"></div>
          <div className="shape four"></div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
