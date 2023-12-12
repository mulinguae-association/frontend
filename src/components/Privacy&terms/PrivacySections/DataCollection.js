import React from 'react';
import { useTranslation } from 'react-i18next';

const DataCollection = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='data-collection'>
      <div>
        <h2>{t("dataCollection.title")}</h2>
        <p>{t("dataCollection.description")}</p>
        <ul>
          {t("dataCollection.waysOfCollection", { returnObjects: true }).map((way, index) => (
            <li key={index}>{way}</li>
          ))}
        </ul>
        <p>{t("dataCollection.legitimatePurposes")}</p>
        <p>{t("dataCollection.detailsCollection")}</p>
      </div>
      <div className='common'>
        <div className='dataYouProvide'>
          <h3>{t("dataCollection.dataYouProvide.title")}</h3>
          <p>{t("dataCollection.dataYouProvide.description")}</p>
          <ul>
            {t("dataCollection.dataYouProvide.dataList", { returnObjects: true }).map((way, index) => (
              <li key={index}>{way}</li>
            ))}
          </ul>
          <p>{t("dataCollection.dataYouProvide.sensitiveDataDes")}</p>
          <ul>
            {t("dataCollection.dataYouProvide.sensitiveDataList", { returnObjects: true }).map((way, index) => (
              <li key={index}>{way}</li>
            ))}
          </ul>
          <p>{t("dataCollection.dataYouProvide.additionalData")}</p>
        </div>
        <div className='dataCollectedAutomatically'>
          <h3>{t("dataCollection.dataCollectedAutomatically.title")}</h3>
          <p>{t("dataCollection.dataCollectedAutomatically.description")}</p>
          <ul>
            {t("dataCollection.dataCollectedAutomatically.collectedData", { returnObjects: true }).map((way, index) => (
              <li key={index}>{way}</li>
            ))}
          </ul>
          <p>{t("dataCollection.dataCollectedAutomatically.additionalDataCollection")}</p>
          <p>{t("dataCollection.dataYouProvide.additionalData")}</p>
        </div>
        <div className='dataFromOtherSources'>
          <h3>{t("dataCollection.dataFromOtherSources.title")}</h3>
          <p>{t("dataCollection.dataFromOtherSources.description")}</p>
          <ul>
            {t("dataCollection.dataFromOtherSources.obtainedData", { returnObjects: true }).map((way, index) => (
              <li key={index}>{way}</li>
            ))}
          </ul>
          <p>{t("dataCollection.dataFromOtherSources.consentObtained")}</p>
        </div>
        <div className='dataWeCreate'>
          <h3>{t("dataCollection.dataWeCreate.title")}</h3>
          <p>{t("dataCollection.dataWeCreate.description")}</p>
          <ul>
            {t("dataCollection.dataWeCreate.createdData", { returnObjects: true }).map((way, index) => (
              <li key={index}>{way}</li>
            ))}
          </ul>
          <p>{t("dataCollection.dataWeCreate.sensitiveDataNote")}</p>
        </div>
        <div className='anonymousDataInformation'>
          <h3>{t("dataCollection.anonymousData.title")}</h3>
          <p>{t("dataCollection.anonymousData.description")}</p>
          <p>{t("dataCollection.anonymousData.createdDataDescription")}</p>
        </div>
      </div>
    </section>
  );
};

export default DataCollection;
