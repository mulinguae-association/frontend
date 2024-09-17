import React from 'react';
import "./NotFound.scss"
import { useTranslation } from 'react-i18next';
const NotFound = () => {
  const { t, i18n } = useTranslation("notFound")
  const checkLang = i18n.language === "ar"
  return (
    <div className='not-found'>
      <div className='container'>
        <div className='content'>
          <h1 className='text-styled'>404</h1>
          <div className="crescent"></div>
        </div>
        <p style={checkLang ? { letterSpacing: "0.5rem" } : {}}> {t("not_found")}</p>
      </div>
    </div>
  )
}

export default NotFound