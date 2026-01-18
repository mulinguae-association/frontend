import React from 'react'
import { useTranslation } from 'react-i18next'

const DataControl = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='data-control'>
      <h2>{t("dataControl.title")}</h2>
      <ul>
        {t("dataControl.description", { returnObjects: true }).map((point, index) => <li key={index}>{point}</li>)}
      </ul>
      <div className='more_details'>
        <div className='head'>
          <h3>{t("dataControl.moreDetails.title")}</h3>
          <p> {t("dataControl.moreDetails.description")}</p>
        </div>
        <div className='choices'>
          {t("dataControl.moreDetails.dataControlChoices", { returnObjects: true }).map((point) =>
            <div key={point.title} className='data_control_choices'>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
              <div className='contact'>
                {point.contactDetails?.map((contact) =>
                  <div key={contact.title} className='way'>
                    <h4>{contact.title}</h4>
                    <span> {contact.desc}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className='communication'>
          <div className='head'>
            <h3>{t("dataControl.moreDetails.communicationPreferences.title")}</h3>
            <p> {t("dataControl.moreDetails.communicationPreferences.description")}</p>
          </div>
          {t("dataControl.moreDetails.communicationPreferences.options", { returnObjects: true }).map((point) =>
            <div key={point.title} className='data_communication'>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DataControl