import { useTranslation } from "react-i18next";
import styles from "./PartnerCallout.module.scss";
import { Handshake, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function PartnerCallout() {
  const { t, i18n } = useTranslation("pages/workWithPage");
  const locale = i18n.language || "en";
  return (
    <section className={styles.partnerCallout}>
      <div className={styles.partnerCalloutContainer}>
        <div className={styles.partnerCalloutContent}>
          <Handshake className={styles.partnerCalloutIcon} />
          <h3 className={styles.partnerCalloutTitle}>
            {t("partnerCallout.title")}
          </h3>
          <p className={styles.partnerCalloutText}>
            {t("partnerCallout.text")}
          </p>
          <div className={styles.partnerCalloutHighlight}>
            <p className={styles.partnerCalloutHighlightText}>
              {t("partnerCallout.highlight")}
            </p>
          </div>
          <Link
            to={`/${locale}/contact`}
            className={styles.partnerCalloutButton}
          >
            <FileText className={styles.partnerCalloutButtonIcon} />
            {t("partnerCallout.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
