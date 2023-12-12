import React from 'react'
import { useTranslation } from 'react-i18next';

const DataUsing = () => {
  const { t } = useTranslation("privacy&terms/privacy");
  return (
    <section id='data-using'>
      <h2>{t("dataCollection.howDoWeUseData.title")}</h2>
      <p>{t("dataCollection.howDoWeUseData.description")}</p>
      <p>{t("dataCollection.howDoWeUseData.serviceProvision.title")}</p>
      <p>{t("dataCollection.howDoWeUseData.serviceProvision.description")}</p>
      <ul>
        {t("dataCollection.howDoWeUseData.serviceProvision.purposes", { returnObjects: true }).map((purpose, index) =>
          <li key={index}>{purpose}</li>
        )}
      </ul>
      <p>{t("dataCollection.howDoWeUseData.improvingAndPromotingServices.title")}</p>
      <div className='common'>
        <div className='improvingAndPromotingServices'>
          <h3>{t("dataCollection.howDoWeUseData.improvingAndPromotingServices.title")}</h3>
          <p>{t("dataCollection.howDoWeUseData.improvingAndPromotingServices.description")}</p>
          <ul>
            {t("dataCollection.howDoWeUseData.improvingAndPromotingServices.objectives", { returnObjects: true }).map((objective, index) =>
              <li key={index}>{objective}</li>
            )}
          </ul>
        </div>
        <div className='operatingBusiness'>
          <h3>{t("dataCollection.howDoWeUseData.operatingBusiness.title")}</h3>
          <p>{t("dataCollection.howDoWeUseData.operatingBusiness.description")}</p>
          <ul>
            {t("dataCollection.howDoWeUseData.operatingBusiness.operationalReasons", { returnObjects: true }).map((reason, index) =>
              <li key={index}>{reason}</li>
            )}
          </ul>
        </div>
      </div>
      <p>{t("dataCollection.howDoWeUseData.otherPurposes")}</p>
    </section>
  )
}

export default DataUsing