import React from 'react'
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation("about", { ns: "about" });
  return (
    <>
      <h1>{t("HelloMessage")}</h1>
      <p>{t("contentTexts")}</p>
    </>
  )
}

export default About