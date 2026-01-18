import React, { useState } from "react";
import Bug from "./Bug";
import axios from "axios";
import TypeSelect from "./TypeSelect";
import AffiliationSelect from "./AffiliationSelect";
import { FaGlobe } from "react-icons/fa";
import "./index.scss";
import { notifyError, notifySuccess } from "../../Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { useTranslation } from "react-i18next";
import logError from "../../../utils/logError";

const FeedBack = () => {
  const { t } = useTranslation("pages/FAQs");
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    affiliation: "",
    affiliationOther: "",
    type: "",
    details: "",
    browser: "",
    browserOther: "",
    operatingSystem: "",
    operatingSystemOther: "",
    screenshot: null,
    url: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out fields with empty values
    const nonEmptyFields = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== "" && value !== null
      )
    );

    try {
      setButtonLoading("FAQs_button", true);
      if (validation()) {
        const { data } = await axios.post("/api/faqs", nonEmptyFields, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data.status) {
          notifySuccess(t("errorMessages.successMessage"));
        } else {
          notifyError(t("errorMessages.failMessage"));
        }

        // // Reset form fields after submission
        setFormData({
          email: "",
          fullName: "",
          affiliation: "",
          affiliationOther: "",
          type: "",
          details: "",
          browser: "",
          browserOther: "",
          operatingSystem: "",
          operatingSystemOther: "",
          screenshot: null,
          url: "",
        });
      }
    } catch (err) {
      logError(err);
    } finally {
      setButtonLoading("FAQs_button", false);
    }
  };
  const validation = () => {
    const {
      email,
      fullName,
      details,
      affiliation,
      affiliationOther,
      type,
      operatingSystem,
      operatingSystemOther,
      browser,
      browserOther,
      screenshot,
    } = formData;
    if (email && !validEmail(email)) {
      notifyError(t("errorMessages.validEmail"));
      return false;
    }

    if (!fullName || !email || !details || !type || !affiliation) {
      if (!email) notifyError(t("errorMessages.emailEmpty"));
      if (!fullName) notifyError(t("errorMessages.fullNameEmpty"));
      if (!details) notifyError(t("errorMessages.detailsEmpty"));
      if (!type) notifyError(t("errorMessages.typeEmpty"));
      if (!affiliation) notifyError(t("errorMessages.affiliationEmpty"));
      return false;
    }
    if (
      affiliation === t("affiliationSelect.options.other") &&
      !affiliationOther
    ) {
      notifyError(t("errorMessages.otherAffiliationEmpty"));
      return false;
    } else if (
      browser === t("bugComponent.browserOptions.other") &&
      !browserOther
    ) {
      notifyError(t("errorMessages.otherBrowserEmpty"));
      return false;
    } else if (
      operatingSystem === t("bugComponent.browserOptions.other") &&
      !operatingSystemOther
    ) {
      notifyError(t("errorMessages.otherOSEmpty"));
      return false;
    }

    if (
      type === t("typeSelect.options.bug") &&
      (!browser || !operatingSystem || !screenshot)
    ) {
      if (!browser) notifyError(t("errorMessages.browserEmpty"));
      if (!operatingSystem) notifyError(t("errorMessages.OSEmpty"));
      if (!screenshot) notifyError(t("errorMessages.screenshotEmpty"));
      return false;
    }
    return true;
  };

  const validEmail = (email) => {
    const emailRegX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegX.test(email);
  };

  return (
    <main className="FAQs">
      <div className="container">
        <h2>{t("header")}</h2>
        <form onSubmit={handleSubmit}>
          <h3>{t("form.head")}</h3>
          <label>
            {t("form.emailLabel")}
            <input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={t("form.emailPlaceholder")}
            />
          </label>

          <label>
            {t("form.fullNameLabel")}
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder={t("form.fullNamePlaceholder")}
            />
          </label>
          <AffiliationSelect formData={formData} handleChange={handleChange} />
          <TypeSelect formData={formData} handleChange={handleChange} />
          <label>
            {t("form.detailsLabel")}
            <textarea
              value={formData.details}
              onChange={(e) => handleChange("details", e.target.value)}
              placeholder={t("form.detailsPlaceholder")}
            />
          </label>

          {formData.type === t("typeSelect.options.bug") && (
            <Bug handleChange={handleChange} formData={formData} />
          )}

          {formData.type !== t("typeSelect.options.comment") && (
            <label>
              {t("form.urlLabel")}
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder={t("form.urlPlaceholder")}
              />
            </label>
          )}

          <button disabled={isBtnLoading["FAQS_button"]} type="submit">
            {isBtnLoading["FAQs_button"]
              ? t("form.submittingButton")
              : t("form.submitButton")}
          </button>

          <span className="earth_icon">
            <FaGlobe />
          </span>

          <div className="shape one"></div>
          <div className="shape two"></div>
          <div className="shape three"></div>
          <div className="shape four"></div>
        </form>
      </div>
    </main>
  );
};
export default FeedBack;
