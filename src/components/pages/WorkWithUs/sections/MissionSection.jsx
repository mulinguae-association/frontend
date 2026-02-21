// MissionSection.tsx
import styles from "./MissionSection.module.scss";
import { Target } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MissionSection() {
  const { t } = useTranslation("pages/workWithPage");
  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        <div className={styles.missionCard}>
          <div className={styles.missionHeader}>
            <div className={styles.iconWrapper}>
              <Target className={styles.icon} />
            </div>
            <h3 className={styles.title}>{t("mission.header")}</h3>
          </div>

          <div className={styles.content}>
            <p className={styles.paragraph}>{t("mission.paragraph1")}</p>

            <p className={styles.paragraph}>{t("mission.paragraph2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
