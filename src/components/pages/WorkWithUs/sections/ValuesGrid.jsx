import styles from "./ValuesGrid.module.scss";
import { Globe2, Users, Shield, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ValuesGrid() {
  const { t } = useTranslation("pages/workWithPage");
  return (
    <section className={styles.valuesGrid}>
      <div className={styles.container}>
        <div className={styles.valuesHeader}>
          <h2 className={styles.valuesTitle}>{t("values.title")}</h2>
          <p className={styles.valuesSubtitle}>{t("values.subtitle")}</p>
        </div>
        <div className={styles.valuesGridList}>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <BookOpen />
            </span>
            <h3 className={styles.valueTitle}>
              {t("values.items.knowledge.title")}
            </h3>
            <p className={styles.valueText}>
              {t("values.items.knowledge.text")}
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Globe2 />
            </span>
            <h3 className={styles.valueTitle}>
              {t("values.items.culture.title")}
            </h3>
            <p className={styles.valueText}>{t("values.items.culture.text")}</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Users />
            </span>
            <h3 className={styles.valueTitle}>
              {t("values.items.identity.title")}
            </h3>
            <p className={styles.valueText}>
              {t("values.items.identity.text")}
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Shield />
            </span>
            <h3 className={styles.valueTitle}>
              {t("values.items.history.title")}
            </h3>
            <p className={styles.valueText}>{t("values.items.history.text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
