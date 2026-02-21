import styles from "./ValuesGrid.module.scss";
import { Globe2, Users, Shield, BookOpen } from "lucide-react";

export default function ValuesGrid() {
  return (
    <section className={styles.valuesGrid}>
      <div className={styles.container}>
        <div className={styles.valuesHeader}>
          <h2 className={styles.valuesTitle}>Why Languages Matter</h2>
          <p className={styles.valuesSubtitle}>
            Every language carries knowledge, culture, identity, and history.
            Preserving them is not simply an academic goal; it is a
            responsibility to humanity.
          </p>
        </div>
        <div className={styles.valuesGridList}>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <BookOpen />
            </span>
            <h3 className={styles.valueTitle}>Knowledge</h3>
            <p className={styles.valueText}>
              Languages preserve unique ways of understanding and interacting
              with the world
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Globe2 />
            </span>
            <h3 className={styles.valueTitle}>Culture</h3>
            <p className={styles.valueText}>
              Each language embodies the traditions, values, and wisdom of its
              speakers
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Users />
            </span>
            <h3 className={styles.valueTitle}>Identity</h3>
            <p className={styles.valueText}>
              Language is fundamental to personal and community identity and
              belonging
            </p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Shield />
            </span>
            <h3 className={styles.valueTitle}>History</h3>
            <p className={styles.valueText}>
              Languages connect us to our past and carry forward ancestral
              knowledge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
