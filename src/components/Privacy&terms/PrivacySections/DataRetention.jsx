import React from "react";
import { useTranslation } from "react-i18next";

const DataRetention = () => {
  const { t } = useTranslation("privacy&terms/privacy");

  return (
    <section id="data-retention">
      <h2>{t("dataRetention.title")}</h2>
      <p>
        {(() => {
          const arr = t("dataRetention.description", { returnObjects: true });
          const safeArr = Array.isArray(arr) ? arr : [];
          return safeArr.map((des, index) => <span key={index}>{des}</span>);
        })()}
      </p>
      <ul>
        {(() => {
          const arr = t("dataRetention.considerations", {
            returnObjects: true,
          });
          const safeArr = Array.isArray(arr) ? arr : [];
          return safeArr.map((point, index) => <li key={index}>{point}</li>);
        })()}
      </ul>
      <div className="additional_info">
        {(() => {
          const arr = t("dataRetention.additionalInfo", {
            returnObjects: true,
          });
          const safeArr = Array.isArray(arr) ? arr : [];
          return safeArr.map((des, index) => <p key={index}>{des}</p>);
        })()}
        <ul>
          {(() => {
            const arr = t("dataRetention.validReasons", {
              returnObjects: true,
            });
            const safeArr = Array.isArray(arr) ? arr : [];
            return safeArr.map((point, index) => <li key={index}>{point}</li>);
          })()}
        </ul>
        <p>{t("dataRetention.decition.title")}</p>
        <ul>
          {(() => {
            const arr = t("dataRetention.decition.description", {
              returnObjects: true,
            });
            const safeArr = Array.isArray(arr) ? arr : [];
            return safeArr.map((point, index) => <li key={index}>{point}</li>);
          })()}
        </ul>
      </div>
    </section>
  );
};

export default DataRetention;
