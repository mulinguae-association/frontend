import React from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";
import {
  FaBookOpen,
  FaBalanceScale,
  FaGlobeAmericas,
  FaClipboardList,
} from "react-icons/fa";

const EducationForAll = () => {
  const { t } = useTranslation("pages/educationForAll");

  return (
    <div className="educationForAll">
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
                The main purpose of developing this project is to address the
                issue of language choice, which remains a{" "}
                <strong>major obstacle to education</strong> for millions of
                students around the world. According to UNESCO,
                <strong>
                  {" "}
                  approximately 40% of the global population does not have
                  access to education in a language they speak and understand.
                </strong>{" "}
                As a result, nearly half of humanity faces linguistic
                discrimination that limits their access to formal education and,
                consequently, to knowledge and opportunity. This linguistic
                barrier further compounds existing inequalities based on class,
                gender, region, race, color, national origin, religion, marital
                status, and disability, among others. In contrast, research
                consistently emphasizes that{" "}
                <strong>
                  learning in one’s mother tongue is crucial to effective
                  education
                </strong>
                . UNESCO highlights that learners achieve better outcomes when
                instruction is delivered in a language they understand,
                especially during the early years of schooling. However, in a
                world increasingly shaped by globalization and interdependence,
                it is also essential that students become proficient in
                international and regional languages.
              </p>
              <p className="purpose-paragraph">
                Such multilingual competence not only enhances access to global
                knowledge and participation in international contexts but also
                strengthens cultural understanding and inclusion. In essence,
                this project seeks to promote an educational approach that
                values mother-tongue-based multilingual education—empowering
                learners to build strong foundations in their native languages
                while also developing proficiency in national and global
                languages.{" "}
                <strong>
                  This balance is essential for equitable, inclusive, and
                  effective education systems worldwide.
                </strong>
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
              {(() => {
                const arr = t("article26.paragraphs", { returnObjects: true });
                const safeArr = Array.isArray(arr) ? arr : [];
                return safeArr.slice(1).map((para, index) => (
                  <p key={index} className="article-paragraph">
                    {para}
                  </p>
                ));
              })()}
            </blockquote>
          </div>
        </section>

        <section className="conference-section">
          <h2>
            <FaGlobeAmericas className="section-icon" />
            {t("worldConference.title")}
          </h2>
          <div className="content-wrapper">
            <p className="conference-description">
              {t("worldConference.description")}
            </p>
            <ul className="conference-list">
              {(() => {
                const arr = t("worldConference.paragraphs", {
                  returnObjects: true,
                });
                const safeArr = Array.isArray(arr) ? arr : [];
                return safeArr.map((para, index) => (
                  <li key={index} className="conference-item">
                    {para}
                  </li>
                ));
              })()}
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
                return safeArr.map((fact, index) => (
                  <li key={index} className="fact-item">
                    {fact}
                  </li>
                ));
              })()}
            </ul>
          </div>
        </section>
        <p className="conclusion">- {t("conclusion")} </p>
      </main>
    </div>
  );
};

export default EducationForAll;
