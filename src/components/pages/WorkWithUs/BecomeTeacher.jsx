import React, { useState } from "react";
import styles from "./BecomeTeacher.module.scss";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BecomeTeacher() {
  const { t, i18n } = useTranslation("pages/workWithPage");
  const locale = i18n.language || "en";
  return (
    <section className={styles.becomeTeacherSection}>
      <div className={styles["bt-container"]}>
        <div className={styles["bt-header"]}>
          <h2 className={styles["bt-title"]}>{t("becomeTeacher.title")}</h2>
          <p className={styles["bt-lead"]}>{t("becomeTeacher.lead")}</p>
        </div>
        <Link to={`/${locale}/contact`} className={styles.ctaJoinBtn}>
          {t("becomeTeacher.button")}
          <ArrowRight className={styles.ctaJoinBtnIcon} />
        </Link>
      </div>
    </section>
  );
}
