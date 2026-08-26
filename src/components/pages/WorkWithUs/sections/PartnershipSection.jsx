import styles from "./PartnershipSection.module.scss";
import {
  Handshake,
  TrendingUp,
  Shield,
  Users,
  Lightbulb,
  Award,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PartnershipSection() {
  const { t } = useTranslation("pages/workWithPage");
  const introParagraphs = t("partnership.introParagraphs", {
    returnObjects: true,
  });
  const missionPoints = t("partnership.missionPoints", {
    returnObjects: true,
  });
  const whyList = t("partnership.whyList", {
    returnObjects: true,
  });
  const missionIcons = [TrendingUp, Shield, Users, Lightbulb];
  return (
    <section className={styles.partnershipSection}>
      <div className={styles.partnershipHeader}>
        <div className={styles.partnershipBadge}>
          <Handshake className={styles.partnershipBadgeIcon} />
          <span>{t("partnership.badge")}</span>
        </div>
        <h2 className={styles.partnershipTitle}>{t("partnership.title")}</h2>
        <p className={styles.partnershipSubtitle}>
          {t("partnership.subtitle")}
        </p>
      </div>
      <div className={styles.partnershipMissionWrap}>
        <div className={styles.partnershipMissionBox}>
          {Array.isArray(introParagraphs) &&
            introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
      <div className={styles.partnershipMissionPointsWrap}>
        <div className="container">
          <h3 className={styles.partnershipMissionPointsTitle}>
            {t("partnership.missionPointsTitle")}
          </h3>
          <div className={styles.partnershipMissionPointsGrid}>
            {Array.isArray(missionPoints) &&
              missionPoints.map((mp, idx) => {
                const Icon = missionIcons[idx] || TrendingUp;
                return (
                  <div className={styles.partnershipMissionPoint} key={idx}>
                    <div className={styles.partnershipMissionPointIconBox}>
                      <Icon className={styles.partnershipMissionPointIcon} />
                    </div>
                    <div>
                      <h4>{mp.title}</h4>
                      <p>{mp.text}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.partnershipMissionNote}>
            <p>{t("partnership.note")}</p>
          </div>
        </div>
      </div>
      <div className={styles.partnershipWhyMattersWrap}>
        <div className={styles.partnershipWhyMattersBox}>
          <div className={styles.partnershipWhyMattersHeader}>
            <div className={styles.partnershipWhyMattersIconBox}>
              <Award className={styles.partnershipWhyMattersIcon} />
            </div>
            <h3>{t("partnership.whyHeader")}</h3>
          </div>
          <p className={styles.partnershipWhyMattersSubtitle}>
            {t("partnership.whySubtitle")}
          </p>
          <div className={styles.partnershipWhyMattersList}>
            {Array.isArray(whyList) &&
              whyList.map((item, i) => (
                <div key={i}>
                  <CheckCircle className={styles.partnershipWhyMattersCheck} />
                  <span>{item}</span>
                </div>
              ))}
          </div>
          <div className={styles.partnershipWhyMattersNote}>
            <p>{t("partnership.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
