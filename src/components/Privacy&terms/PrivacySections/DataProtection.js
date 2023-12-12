import React from 'react'
import { useTranslation } from 'react-i18next'

const DataProtection = () => {
  const { t } = useTranslation("privacy&terms/privacy")

  return (
    <section id='data-protection'>
      <h2>{t("dataSafety.title")}</h2>
      <ul>
        {t("dataSafety.description", { returnObjects: true }).map((point, index) => <li key={index}>{point}</li>)}
      </ul>
      <div className='more_details'>
        <ul>
          {t("dataSafety.moreDetails", { returnObjects: true }).map((point, index) => <li key={index}>{point}</li>)}
        </ul>
      </div>
    </section>
  )
}

export default DataProtection