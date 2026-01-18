import React from 'react'
import { useTranslation } from 'react-i18next'

const SocialFeatures = () => {
  const { t } = useTranslation("privacy&terms/privacy")

  return (
    <section id='social-features'>
      <h2>{t("socialFeatures.title")}</h2>
      <p>{t("socialFeatures.description")}</p>
    </section>
  )
}

export default SocialFeatures