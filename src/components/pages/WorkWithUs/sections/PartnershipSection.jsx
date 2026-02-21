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

export default function PartnershipSection() {
  return (
    <section className={styles.partnershipSection}>
      <div className={styles.partnershipHeader}>
        <div className={styles.partnershipBadge}>
          <Handshake className={styles.partnershipBadgeIcon} />
          <span>Collaboration</span>
        </div>
        <h2 className={styles.partnershipTitle}>
          Together We Work Better and Faster!
        </h2>
        <p className={styles.partnershipSubtitle}>
          We are open to work with other organisations that have the same
          objectives as us and share our values.
        </p>
      </div>
      <div className={styles.partnershipMissionWrap}>
        <div className={styles.partnershipMissionBox}>
          <p>
            At ACS Mulinguae, we are committed to advancing equitable access to
            education through the promotion of multilingualism and the
            preservation of linguistic diversity.
          </p>
          <p>
            We believe that language is not merely a tool of communication, but
            a carrier of knowledge systems, cultural memory, identity, and
            social cohesion. Yet today, hundreds of languages are at risk of
            disappearance, and millions of learners remain underserved by
            education systems that do not reflect their linguistic realities.
          </p>
        </div>
      </div>
      <div className={styles.partnershipMissionPointsWrap}>
        <div className="container">
          <h3 className={styles.partnershipMissionPointsTitle}>Our Mission</h3>
          <div className={styles.partnershipMissionPointsGrid}>
            <div className={styles.partnershipMissionPoint}>
              <div className={styles.partnershipMissionPointIconBox}>
                <TrendingUp className={styles.partnershipMissionPointIcon} />
              </div>
              <div>
                <h4>Promote Multilingual Education</h4>
                <p>As a driver of inclusion and academic success</p>
              </div>
            </div>
            <div className={styles.partnershipMissionPoint}>
              <div className={styles.partnershipMissionPointIconBox}>
                <Shield className={styles.partnershipMissionPointIcon} />
              </div>
              <div>
                <h4>Strengthen Language Protection</h4>
                <p>Protection and revitalization of vulnerable languages</p>
              </div>
            </div>
            <div className={styles.partnershipMissionPoint}>
              <div className={styles.partnershipMissionPointIconBox}>
                <Users className={styles.partnershipMissionPointIcon} />
              </div>
              <div>
                <h4>Support Teachers</h4>
                <p>
                  Through collaborative, research-informed pedagogical practices
                </p>
              </div>
            </div>
            <div className={styles.partnershipMissionPoint}>
              <div className={styles.partnershipMissionPointIconBox}>
                <Lightbulb className={styles.partnershipMissionPointIcon} />
              </div>
              <div>
                <h4>Sustainable Education Models</h4>
                <p>That respect linguistic diversity</p>
              </div>
            </div>
          </div>
          <div className={styles.partnershipMissionNote}>
            <p>
              We operate through a collaborative framework in which educators,
              institutions, and partners work together—not hierarchically, but
              collectively—to achieve measurable outcomes in language
              preservation and inclusive education.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.partnershipWhyMattersWrap}>
        <div className={styles.partnershipWhyMattersBox}>
          <div className={styles.partnershipWhyMattersHeader}>
            <div className={styles.partnershipWhyMattersIconBox}>
              <Award className={styles.partnershipWhyMattersIcon} />
            </div>
            <h3>Why Partnership Matters</h3>
          </div>
          <p className={styles.partnershipWhyMattersSubtitle}>
            Strategic partnerships enable us to:
          </p>
          <div className={styles.partnershipWhyMattersList}>
            <div>
              <CheckCircle className={styles.partnershipWhyMattersCheck} />
              <span>Expand multilingual curriculum development</span>
            </div>
            <div>
              <CheckCircle className={styles.partnershipWhyMattersCheck} />
              <span>Provide teacher training and professional development</span>
            </div>
            <div>
              <CheckCircle className={styles.partnershipWhyMattersCheck} />
              <span>
                Develop educational materials in underrepresented languages
              </span>
            </div>
            <div>
              <CheckCircle className={styles.partnershipWhyMattersCheck} />
              <span>Conduct research and impact evaluation</span>
            </div>
            <div>
              <CheckCircle className={styles.partnershipWhyMattersCheck} />
              <span>Scale sustainable models of inclusive education</span>
            </div>
          </div>
          <div className={styles.partnershipWhyMattersNote}>
            <p>
              Our work directly contributes to global education and cultural
              preservation objectives, including inclusive and equitable quality
              education and the safeguarding of intangible cultural heritage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
