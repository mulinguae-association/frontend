import React from 'react'
import { useTranslation } from 'react-i18next';

const Complaints = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='complaints'>
      <h2>{t("complaints.title")}</h2>
      <p> {t("complaints.description")}</p>
    </section>
  )
}

export default Complaints