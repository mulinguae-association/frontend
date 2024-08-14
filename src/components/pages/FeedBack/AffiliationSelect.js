import React from 'react'
import { useTranslation } from 'react-i18next'

const AffiliationSelect = ({ formData, handleChange }) => {
  const { t } = useTranslation("pages/FAQs")
  return (
    <>
      <label>
        {t("affiliationSelect.label")}
        <div className='input_group'>
          <select
            value={formData.affiliation}
            onChange={(e) => handleChange('affiliation', e.target.value)}
            placeholder={t("affiliationSelect.selectPlaceholder")}
          >
            <option value="">{t("affiliationSelect.selectPlaceholder")}</option>
            <option value={t("affiliationSelect.options.prospectiveStudent")}>
              {t("affiliationSelect.options.prospectiveStudent")}
            </option>
            <option value={t("affiliationSelect.options.currentStudent")}>{t("affiliationSelect.options.currentStudent")}</option>
            <option value={t("affiliationSelect.options.currentTeacher")}>{t("affiliationSelect.options.currentTeacher")}</option>
            <option value={t("affiliationSelect.options.other")}>{t("affiliationSelect.options.other")}</option>
          </select>
          {formData.affiliation === t("affiliationSelect.options.other") && (
            <input
              type="text"
              value={formData.affiliationOther}
              onChange={(e) => handleChange('affiliationOther', e.target.value)}
              placeholder={t("affiliationSelect.otherPlaceholder")}
              min={8}
            />
          )}
        </div>
      </label>
    </>
  )
}

export default AffiliationSelect