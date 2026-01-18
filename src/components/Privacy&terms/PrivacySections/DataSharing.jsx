import React from 'react'
import { useTranslation } from 'react-i18next'

const DataSharing = () => {
  const { t } = useTranslation("privacy&terms/privacy")

  return (
    <section id='data-sharing'>
      <div className='dataSharing'>
        <h2>{t("dataSharing.title")}</h2>
        <p>{t("dataSharing.description")}</p>
        <h3>{t("dataSharing.reasonsForSharing.title")}</h3>
        <ul>{t("dataSharing.reasonsForSharing.list", { returnObjects: true }).map((list, index) => <li key={index}>{list}</li>)}</ul>
        <div className='other_data_sharing'>
          {t("dataSharing.otherReasons", { returnObjects: true }).map((list) =>
            <div key={list.title}>
              <h3>{list.title}</h3>
              <p> {list.description}</p>
            </div>
          )}
          <p>{t("dataSharing.note")}</p>
        </div>
      </div>
    </section>
  )
}

export default DataSharing