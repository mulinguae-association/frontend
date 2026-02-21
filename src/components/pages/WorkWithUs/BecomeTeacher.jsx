import React, { useState } from "react";
import styles from "./BecomeTeacher.module.scss";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BecomeTeacher() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";
  return (
    <section className={styles.becomeTeacherSection}>
      <div className={styles["bt-container"]}>
        <div className={styles["bt-header"]}>
          <h2 className={styles["bt-title"]}>
            Become a Teacher with ACS Mulinguae
          </h2>
          <p className={styles["bt-lead"]}>
            At ACS Mulinguae, we believe that multilingualism is a powerful
            bridge between cultures and a vital pathway to equitable access to
            education and the empowerment of vulnerable communities worldwide.
            Please complete the application form and submit it together with
            your CV.
          </p>
        </div>
        <Link to={`/${locale}/contact`} className={styles.ctaJoinBtn}>
          Join Our Community
          <ArrowRight className={styles.ctaJoinBtnIcon} />
        </Link>
      </div>
    </section>
  );
}
