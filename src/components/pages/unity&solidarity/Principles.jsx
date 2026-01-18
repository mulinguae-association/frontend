import React from "react";
import Card, { CardBody, CardHeader } from "./Card";
import { TbUsers } from "react-icons/tb";
import { BiHeart } from "react-icons/bi";
import styles from "./Principles.module.scss";
import { useTranslation } from "react-i18next";

export default function Principles() {
  const { t } = useTranslation("pages/unityAndSolidarity");

  return (
    <div className={styles.grid}>
      <Card>
        <CardHeader
          title={t("principles.unity.title")}
          subtitle={t("principles.unity.subtitle")}
          icon={TbUsers}
        />
        <CardBody className={styles.card__body}>
          <div className={styles.scroll_indicator}></div>
          {(() => {
            const arr = t("principles.unity.description", { returnObjects: true });
            const safeArr = Array.isArray(arr) ? arr : [];
            return safeArr.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ));
          })()}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title={t("principles.solidarity.title")}
          subtitle={t("principles.solidarity.subtitle")}
          icon={BiHeart}
          className={styles["solidarity-header"]}
        />
        <CardBody className={styles.card__body}>
          {(() => {
            const arr = t("principles.solidarity.description", { returnObjects: true });
            const safeArr = Array.isArray(arr) ? arr : [];
            return safeArr.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ));
          })()}
        </CardBody>
      </Card>
    </div>
  );
}
