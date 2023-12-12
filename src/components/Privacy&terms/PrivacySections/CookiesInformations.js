import React from 'react'
import { useTranslation } from 'react-i18next';

const CookiesInformations = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='cookies-information'>
      <div className='howDoWeUseCookies'>
        <h2>{t("howDoWeUseCookies.title")}</h2>
        <p>{t("howDoWeUseCookies.description")}</p>
        <p>{t("howDoWeUseCookies.note")}</p>
      </div>
    </section>
  )
}

export default CookiesInformations