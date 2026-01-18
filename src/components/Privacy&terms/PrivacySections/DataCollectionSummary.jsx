import React from 'react'
import { useTranslation } from 'react-i18next'
const DataCollectionSummary = () => {
  const { t } = useTranslation("privacy&terms/privacy");
  return (
    <section id='data-collection-summary'>
      <div className='collectData'>
        <h2>{t("Collect Data.summary")}</h2>
        <span className='notice'>{t("Collect Data.noticeAtCollection")}</span>
        <div className='categories'>
          {t("Collect Data.categories", { returnObjects: true }).map((ele) =>
            <div key={ele.category} className='category'>
              <h3>{ele.category}</h3>
              <p>{ele.description}</p>
              <h4>{ele.purpose}</h4>
              <ul>
                {ele.uses?.map((ele, index) => <li key={index}>{ele}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div>
          {t("Collect Data.OtherDisclosures", { returnObjects: true }).map((ele) =>
            <div key={ele.title} className='category'>
              <h3>{ele.title}</h3>
              <p>{ele.content}</p>
              <p>{ele.notice}</p>
              <p>{ele.details}</p>
              <h4>{ele.purpose}</h4>
              <ul>
                {ele.uses?.map((ele, index) => <li key={index}>{ele}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DataCollectionSummary