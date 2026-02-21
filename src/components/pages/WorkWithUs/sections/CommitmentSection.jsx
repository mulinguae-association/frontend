import styles from "./CommitmentSection.module.scss";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CommitmentSection() {
  const { t } = useTranslation("pages/workWithPage");
  return (
    <section className={styles.commitmentSection}>
      <div className={styles.commitmentContainer}>
        <h2 className={styles.commitmentTitle}>{t("commitment.title")}</h2>
        <div className={styles.commitmentList}>
          <div className={styles.commitmentItem}>
            <CheckCircle className={styles.commitmentIcon} />
            <div>
              <h3 className={styles.commitmentItemTitle}>
                {t("commitment.items.0.title")}
              </h3>
              <p className={styles.commitmentItemText}>
                {t("commitment.items.0.text")}
              </p>
            </div>
          </div>
          <div className={styles.commitmentItem}>
            <CheckCircle className={styles.commitmentIcon} />
            <div>
              <h3 className={styles.commitmentItemTitle}>
                {t("commitment.items.1.title")}
              </h3>
              <p className={styles.commitmentItemText}>
                {t("commitment.items.1.text")}
              </p>
            </div>
          </div>
          <div className={styles.commitmentItem}>
            <CheckCircle className={styles.commitmentIcon} />
            <div>
              <h3 className={styles.commitmentItemTitle}>
                {t("commitment.items.2.title")}
              </h3>
              <p className={styles.commitmentItemText}>
                {t("commitment.items.2.text")}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.commitmentNote}>
          <p className={styles.commitmentNoteText}>{t("commitment.note")}</p>
        </div>
      </div>
    </section>
  );
}
