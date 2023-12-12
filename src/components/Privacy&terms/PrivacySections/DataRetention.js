import React from 'react';
import { useTranslation } from 'react-i18next';

const DataRetention = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='data-retention'>
      <h2>{t("dataRetention.title")}</h2>
      <p>
        {t("dataRetention.description", { returnObjects: true }).map((des, index) => (
          <span key={index}>{des}</span>
        ))}
      </p>
      <ul>
        {t("dataRetention.considerations", { returnObjects: true }).map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <div className='additional_info'>
        {t("dataRetention.additionalInfo", { returnObjects: true }).map((des, index) => (
          <p key={index}>{des}</p>
        ))}
        <ul>
          {t("dataRetention.validReasons", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <p>{t("dataRetention.decition.title")}</p>
        <ul>
          {t("dataRetention.decition.description", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DataRetention;
