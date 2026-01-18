import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { notifyError } from '../../Notify'

const Bug = ({ handleChange, formData }) => {
  const { t } = useTranslation("pages/FAQs")
  const fileInputRef = useRef(null)
  const handleImage = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; //5mb

    if (file && file.size > maxSize) {
      notifyError(t("errorMessages.screenshotAlert"))
      fileInputRef.current.value = ""
    }
    handleChange('screenshot', e.target.files[0])
  }
  return (
    <>
      <label>
        {t("bugComponent.browserLabel")}
        <div className='input_group'>
          <select
            value={formData.browser}
            onChange={(e) => handleChange('browser', e.target.value)}
          >
            <option value={t("bugComponent.selectBrowserPlaceholder")}>{t("bugComponent.selectBrowserPlaceholder")}</option>
            <option value={t("bugComponent.browserOptions.chrome")}>{t("bugComponent.browserOptions.chrome")}</option>
            <option value={t("bugComponent.browserOptions.firefox")}>{t("bugComponent.browserOptions.firefox")}</option>
            <option value={t("bugComponent.browserOptions.safari")}>{t("bugComponent.browserOptions.safari")}</option>
            <option value={t("bugComponent.browserOptions.edge")}>{t("bugComponent.browserOptions.edge")}</option>
            <option value={t("bugComponent.browserOptions.other")}>{t("bugComponent.browserOptions.other")}</option>
          </select>
          {formData.browser === t("bugComponent.browserOptions.other") && (
            <input
              type="text"
              value={formData.borwserOther}
              onChange={(e) => handleChange('browserOther', e.target.value)}
              placeholder={t("bugComponent.otherBrowserPlaceholder")}
            />
          )}
        </div>
      </label>

      <label>
        {t("bugComponent.OSLabel")}
        <div className='input_group'>
          <select
            value={formData.operatingSystem}
            onChange={(e) => handleChange('operatingSystem', e.target.value)}
          >
            <option value="">{t("bugComponent.selectOSPlaceholder")}</option>
            <option value={t("bugComponent.OSOptions.windows")}>{t("bugComponent.OSOptions.windows")}</option>
            <option value={t("bugComponent.OSOptions.macOS")}>{t("bugComponent.OSOptions.macOS")}</option>
            <option value={t("bugComponent.OSOptions.linux")}>{t("bugComponent.OSOptions.linux")}</option>
            <option value={t("bugComponent.OSOptions.other")}>{t("bugComponent.OSOptions.other")}</option>
          </select>
          {formData.operatingSystem === t("bugComponent.OSOptions.other") && (
            <input
              type="text"
              value={formData.borwserOther}
              onChange={(e) => handleChange('operatingSystemOther', e.target.value)}
              placeholder={t("bugComponent.otherOSPlaceholder")}
            />
          )}
        </div>
      </label>

      <label id='upload-img'>
        {t("bugComponent.screenshotLabel")}
        <input
          ref={fileInputRef}
          type="file"
          name='screenshot'
          accept="image/*"
          id='upload-img'
          onChange={handleImage}
        />
      </label>
    </>
  )
}

export default Bug