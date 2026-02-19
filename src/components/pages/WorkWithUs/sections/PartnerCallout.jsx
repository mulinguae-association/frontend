import { useTranslation } from "react-i18next";
import styles from "./PartnerCallout.module.scss";
import { Handshake, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function PartnerCallout() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";
  return (
    <section className={styles.partnerCallout}>
      <div className={styles.partnerCalloutContainer}>
        <div className={styles.partnerCalloutContent}>
          <Handshake className={styles.partnerCalloutIcon} />
          <h3 className={styles.partnerCalloutTitle}>
            Seeking Like-Minded Partners
          </h3>
          <p className={styles.partnerCalloutText}>
            We seek partners who recognize that linguistic diversity is not a
            marginal issue, but a foundational pillar of sustainable
            development, social justice, and long-term human advancement.
          </p>
          <div className={styles.partnerCalloutHighlight}>
            <p className={styles.partnerCalloutHighlightText}>
              Together, we can ensure that education systems empower learners in
              their own languages — and that no language, and no learner, is
              left behind.
            </p>
          </div>
          <Link
            to={`/${locale}/contact`}
            className={styles.partnerCalloutButton}
          >
            <FileText className={styles.partnerCalloutButtonIcon} />
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
