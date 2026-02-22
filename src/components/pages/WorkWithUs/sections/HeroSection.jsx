import { useTranslation } from "react-i18next";
import styles from "./HeroSection.module.scss";
import { Users, Heart } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation("pages/workWithPage");
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <Users className={styles.heroBadgeIcon} />
          <span>{t("hero.badge")}</span>
        </div>
        <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
        <p
          className={styles.heroSubtitle}
          dangerouslySetInnerHTML={{ __html: t("hero.subtitle") }}
        />
        <div className={styles.heroCommunity}>
          <Heart className={styles.heroCommunityIcon} />
          <p>{t("hero.community")}</p>
        </div>
      </div>
    </header>
  );
}
