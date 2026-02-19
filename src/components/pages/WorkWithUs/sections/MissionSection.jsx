// MissionSection.tsx
import styles from "./MissionSection.module.scss";
import { Target } from "lucide-react";

export default function MissionSection() {
  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        <div className={styles.missionCard}>
          <div className={styles.missionHeader}>
            <div className={styles.iconWrapper}>
              <Target className={styles.icon} />
            </div>
            <h3 className={styles.title}>Our Shared Objective</h3>
          </div>

          <div className={styles.content}>
            <p className={styles.paragraph}>
              We are building a collaborative community of educators united by a
              shared objective:{" "}
              <span className={styles.highlight}>
                to promote multilingualism and to protect the world's languages
                from the risk of disappearance.
              </span>
            </p>

            <p className={styles.paragraph}>
              When you join ACS Mulinguae, you become part of a committed team
              that believes linguistic diversity is not optional — it is
              essential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
