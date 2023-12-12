import React from 'react'
import { useTranslation } from 'react-i18next'

const ContactUs = () => {
  const { t } = useTranslation("privacy&terms/privacy")

  return (
    <section id='contact-us'>
      <h2>{t("contactUs.title")}</h2>
      <p> {t("contactUs.description")}</p>
      {t("contactUs.contactDetails", { returnObjects: true }).map((point) =>
        <div key={point.title} className='data_communication'>
          <h3>{point.title}</h3>
          <span>{point.desc}</span>
        </div>
      )}
    </section>
  )
}

export default ContactUs