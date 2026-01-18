import React from 'react';
import "./index.scss";
import { useTranslation } from 'react-i18next';
import { FaBookOpen, FaBalanceScale, FaGlobeAmericas, FaClipboardList } from 'react-icons/fa';

const EducationForAll = () => {
  const { t } = useTranslation("pages/educationForAll");

  return (
    <div className='educationForAll'>
      <header>
        <h1>{t("header.title")}</h1>
      </header>

      <main className="container">
        <section className="purpose-section">
          <h2>
            <FaBookOpen className="section-icon" />
            {t("projectPurpose.title")}
          </h2>
          <div className="content-wrapper">
            <div>
              <p className="purpose-paragraph">
                The main purpose of developing this project is to address the issue of language choice which is a <strong>major obstacle to the education</strong> of many students in many countries. According to UNESCO <strong>40% of the world´s population does not have access to education in a language they speak and understand</strong>. The immediate result of this situation is that 40% of the world population are in a discriminate situation when it comes to access to knowledge in formal education. This adds to the long list of discriminations in terms of class, gender, region, race, color, national origin, religion, marital status, disability and more. Furthermore, it has been recognized that <strong>learners´ mother tongue is "crucial to effective learning"</strong> and with the incidence of globalization on education students must also be proficient in an international and regional language.
              </p>
              <p className="purpose-paragraph">
                The research evidence today clearly shows that <strong>using the learners' mother tongue is crucial to effective learning</strong>. Indeed, some educationists have argued that the only countries likely to achieve EFA are those where the language of instruction is the learners' mother tongue. However, the prevalence of globalization and democratic ideals demonstrates that <strong>students must be proficient in international and regional languages</strong> to gain access to wider society and to participate meaningfully in their world. (UNESCO)
              </p>
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>
            <FaBalanceScale className="section-icon" />
            {t("article26.title")}
          </h2>
          <div className="content-wrapper">
            {(() => {
              const arr = t("article26.paragraphs", { returnObjects: true });
              const safeArr = Array.isArray(arr) ? arr : [];
              return <p className="article-paragraph">{safeArr[0]}</p>;
            })()}
            <blockquote className="article-quote">
              {t("article26.paragraphs", { returnObjects: true }).slice(1).map((para, index) =>
                <p key={index} className="article-paragraph">{para}</p>
              )}
            </blockquote>
          </div>
        </section>

        <section className="conference-section">
          <h2>
            <FaGlobeAmericas className="section-icon" />
            {t("worldConference.title")}
          </h2>
          <div className="content-wrapper">
            <p className="conference-description">{t("worldConference.description")}</p>
            <ul className="conference-list">
              {
                t("worldConference.paragraphs", { returnObjects: true }).map((para, index) =>
                  <li key={index} className="conference-item">{para}</li>
                )
              }
            </ul>
          </div>
        </section>

        <section className="facts-section">
          <h2>
            <FaClipboardList className="section-icon" />
            {t("keyFacts.title")}
          </h2>
          <div className="content-wrapper">
            <ul className="facts-list">
              {(() => {
                const arr = t("keyFacts.paragraphs", { returnObjects: true });
                const safeArr = Array.isArray(arr) ? arr : [];
                return safeArr.map((fact, index) => <li key={index} className="fact-item">{fact}</li>);
              })()}
            </ul>
          </div>
        </section>
        <p className="conclusion">- {t("conclusion")} </p>
      </main>
    </div>
  );
}

export default EducationForAll;
