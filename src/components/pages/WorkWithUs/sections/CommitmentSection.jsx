import styles from "./CommitmentSection.module.scss";
import { CheckCircle } from "lucide-react";

export default function CommitmentSection() {
  return (
    <section className={styles.commitmentSection}>
      <div className={styles.commitmentContainer}>
        <h2 className={styles.commitmentTitle}>Our Commitment</h2>
        <div className={styles.commitmentList}>
          <div className={styles.commitmentItem}>
            <CheckCircle className={styles.commitmentIcon} />
            <div>
              <h3 className={styles.commitmentItemTitle}>Inclusive Education</h3>
              <p className={styles.commitmentItemText}>
                We ensure that education welcomes and values all learners, regardless of their linguistic background
              </p>
            </div>
          </div>
          <div className={styles.commitmentItem}>
            <CheckCircle className={styles.commitmentIcon} />
            <div>
              <h3 className={styles.commitmentItemTitle}>Accessible Learning</h3>
              <p className={styles.commitmentItemText}>
                We break down barriers to make language education available to everyone, everywhere
              </p>
            </div>
          </div>
          <div className={styles.commitmentItem}>
            <CheckCircle className={styles.commitmentIcon} />
            <div>
              <h3 className={styles.commitmentItemTitle}>Respectful of Heritage</h3>
              <p className={styles.commitmentItemText}>
                We honor and preserve the linguistic heritage that defines communities around the world
              </p>
            </div>
          </div>
        </div>
        <div className={styles.commitmentNote}>
          <p className={styles.commitmentNoteText}>
            Together, we work to ensure that education is inclusive, accessible, and respectful of linguistic heritage.
          </p>
        </div>
      </div>
    </section>
  );
}
