import React from 'react';
import { useTranslation } from 'react-i18next';

const DataUsage = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id='data-usage'>
      <h2>{t("dataUsage.title")}</h2>
      <p>
        {t("dataUsage.description", { returnObjects: true }).map((des, index) => (
          <span key={index}>{des}</span>
        ))}
      </p>
      <ul>
        {t("dataUsage.reasons", { returnObjects: true }).map((reas, index) => (
          <li key={index}>{reas}</li>
        ))}
      </ul>
      <div className='keyReasons'>
        {t("dataUsage.keyReasons", { returnObjects: true }).map((reas, index) => (
          <div className='reason' key={index}>
            <h3>{`${reas.title}: `} </h3>
            <span>{` ${reas.description}`}</span>
            {reas.examples && (
              <ul>
                {reas.examples.map((exa, exaIndex) => (
                  <li key={exaIndex}>{exa}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DataUsage;
