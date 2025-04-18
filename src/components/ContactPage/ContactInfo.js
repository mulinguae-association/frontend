import React from 'react'
import { useTranslation } from 'react-i18next'

const ContactInfo = () => {
  const { t } = useTranslation("contact");

  return (
    <div className='contact_info'>
      <div className='col'>
        <h2>
          <a href='tel:+51 (939) 499-087'>
            <span dir="ltr" lang="en">+51 (939) 499-087</span>
          </a>
        </h2>
      </div>
      <div className='col'>
        <h2>{t("contactInfo.tutoringHours.title")}</h2>
        <p>{t("contactInfo.tutoringHours.value")}</p>

        <h2>{t("contactInfo.officeHours.title")}</h2>
        <p>
          <span>{t("contactInfo.officeHours.value.mondayToFridayLabel")} </span>
          <span dir="ltr" lang="en">7</span>
          <span>{t("contactInfo.time.am")}</span>
          <span> - </span>
          <span dir="ltr" lang="en">11</span>
          <span>{t("contactInfo.time.pm")}</span>
        </p>
        <p>
          <span>{t("contactInfo.officeHours.value.saturdayAndSundayLabel")} </span>
          <span dir="ltr" lang="en">8</span>
          <span>{t("contactInfo.time.am")}</span>
          <span> - </span>
          <span dir="ltr" lang="en">5</span>
          <span>{t("contactInfo.time.pm")}</span>
        </p>
      </div>
      <div className='col'>
        <h2>
          <a href='mailto:acsmulingua@gmail.com'>{t("contactInfo.email")}</a>
        </h2>
      </div>
    </div>
  )
}

export default ContactInfo