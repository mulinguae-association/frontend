import React from 'react'
import { useTranslation } from 'react-i18next'

const ContactInfo = () => {
  const { t } = useTranslation("contact");


  return (
    <div className='contact_info'>
      <div className='col'>
        <h2>
          <a href='tel:+51 (939) 499-087'>
            <span>{t("contactInfo.phone")}</span>
          </a>
        </h2>
      </div>
      <div className='col'>
        <h2>{t("contactInfo.tutoringHours.title")}</h2>
        <p>{t("contactInfo.tutoringHours.value")}</p>

        <h2>{t("contactInfo.officeHours.title")}</h2>
        <p>{t("contactInfo.officeHours.value.mondayToFriday")}</p>
        <p>{t("contactInfo.officeHours.value.saturdayAndSunday")}</p>
      </div>
      <div className='col'>
        <h2>
          <a href='mailto:acsmulingua@gmail.com'>AcsMulingua@gmail.com</a>
        </h2>
      </div>
    </div>
  )
}

export default ContactInfo