import React from 'react'
import { useTranslation } from 'react-i18next'

const TypeSelect = ({ formData, handleChange }) => {
  const { t } = useTranslation("pages/FAQs")
  return (
    <>
      <label>
        {t("typeSelect.label")}
        <div className='input_group'>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            placeholder={t("typeSelect.selectPlaceholder")}
          >
            <option value="">{t("typeSelect.selectPlaceholder")}</option>
            <option value={t("typeSelect.options.bug")}>{t("typeSelect.options.bug")}</option>
            <option value={t("typeSelect.options.featureSuggestion")}>
              {t("typeSelect.options.featureSuggestion")}
            </option>
            <option value={t("typeSelect.options.comment")}>{t("typeSelect.options.comment")}</option>
            <option value={t("typeSelect.options.correction")}>{t("typeSelect.options.correction")}</option>
            <option value={t("typeSelect.options.help")}>{t("typeSelect.options.help")}</option>
            <option value={t("typeSelect.options.siteSearch")}>{t("typeSelect.options.siteSearch")}</option>
            <option value={t("typeSelect.options.admissionQuestion")}>{t("typeSelect.options.admissionQuestion")}</option>
          </select>
        </div>
      </label>
    </>
  )
}

export default TypeSelect