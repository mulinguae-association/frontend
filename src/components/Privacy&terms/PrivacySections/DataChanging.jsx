import React from 'react'
import { useTranslation } from 'react-i18next'

const DataChanging = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='data-changing'>
      <h2>{t("changesToPolicy.title")}</h2>
      <ul>
        {t("changesToPolicy.description", { returnObjects: true }).map((point, index) =>
          <li key={index}>{point}</li>
        )}
      </ul>
      <p className='last_updated'> {t("changesToPolicy.lastUpdated")}</p>
    </section>
  )
}

export default DataChanging