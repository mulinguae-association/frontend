import styles from "./HeroSection.module.scss";
import { Users, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <Users className={styles.heroBadgeIcon} />
          <span>Join Our Mission</span>
        </div>
        <h1 className={styles.heroTitle}>WORK WITH US</h1>
        <p className={styles.heroSubtitle}>
          At ACS Mulinguae, you do not work{" "}
          <span className={styles.em}>for us</span> — you work{" "}
          <span className={styles.em}>with us</span>.
        </p>
        <div className={styles.heroCommunity}>
          <Heart className={styles.heroCommunityIcon} />
          <p>Building a collaborative community of educators</p>
        </div>
      </div>
    </header>
  );
}
