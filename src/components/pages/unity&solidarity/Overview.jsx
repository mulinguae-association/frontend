import React from "react";
import Card, { CardBody, CardHeader } from "./Card";
import { FiZap } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { BiHeart } from "react-icons/bi";
import styles from "./Overview.module.scss";
import { useTranslation } from "react-i18next";

export default function Overview() {
  const { t } = useTranslation("pages/unityAndSolidarity");

  return (
    <Card>
      <CardHeader
        title={t("overview.title")}
        subtitle={t("overview.subtitle")}
        icon={TbUsers}
      />
      <CardBody>
        <div className={styles.card__item}>
          <FiZap className={styles.card__icon} />
          <div className={styles.card__content}>
            <h3 className={styles.card__heading}>
              {t("overview.equality.title")}
            </h3>
            <p className={styles.card__text}>
              {t("overview.equality.description")}
              {/* Additional text removed for translation */}
            </p>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.card__item}>
          <BiHeart className={styles.card__icon} />
          <div className={styles.card__content}>
            <h3 className={styles.card__heading}>Human Values</h3>
            <p className={styles.card__text}>
              Recognize that as human beings, we all have the same values. This
              means that we all have the same rights, that we should all receive
              the same level of respect and have the same access to
              opportunities.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
