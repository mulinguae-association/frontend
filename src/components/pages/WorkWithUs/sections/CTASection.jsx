import styles from "./CTASection.module.scss";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBadge}>
        <Heart className={styles.ctaBadgeIcon} />
        <span>Make a Difference</span>
      </div>
      <h2 className={styles.ctaTitle}>Be Part of Something Greater</h2>
      <p className={styles.ctaText}>
        Be part of the team that stands for education, diversity, and the
        protection of languages worldwide.
      </p>
      <div className={styles.ctaActions}>
        <Link to="/register" className={styles.ctaJoinBtn}>
          Join Our Community
          <ArrowRight className={styles.ctaJoinBtnIcon} />
        </Link>
        <a href="#" className={styles.ctaLearnBtn}>
          Learn More
        </a>
      </div>
    </section>
  );
}
