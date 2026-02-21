import styles from "./CTASection.module.scss";
import { Heart, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CTASection() {
  const { t, i18n } = useTranslation("pages/workWithPage");
  const locale = i18n.language;
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBadge}>
        <Heart className={styles.ctaBadgeIcon} />
        <span>{t("cta.badge")}</span>
      </div>
      <h2 className={styles.ctaTitle}>{t("cta.title")}</h2>
      <p className={styles.ctaText}>{t("cta.text")}</p>
      <div className={styles.ctaActions}>
        <Link to={`/${locale}/contact`} className={styles.ctaJoinBtn}>
          {t("cta.join")}
          <ArrowRight className={styles.ctaJoinBtnIcon} />
        </Link>
        <Link to={`/${locale}/about`} className={styles.ctaLearnBtn}>
          {t("cta.learn")}
        </Link>
      </div>
    </section>
  );
}
