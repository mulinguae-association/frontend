import React from 'react'
import { useTranslation } from 'react-i18next';
const Home = () => {
  const { t } = useTranslation("home", { ns: "home" });
  return (
    <>
      <h1>{t("welcomeMessage")}</h1>
      <p>{t("contentText")}</p>
    </>
  )
}

export default Home