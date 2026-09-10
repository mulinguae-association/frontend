import { SEO } from "../../SEO";
import "./index.scss";
import { useTranslation } from "react-i18next";
import {
  FaBookOpen,
  FaBalanceScale,
  FaGlobeAmericas,
  FaClipboardList,
} from "react-icons/fa";

const renderRich = (text = "") =>
  text.split(/(<strong>.*?<\/strong>)/g).map((part, i) =>
    part.startsWith("<strong>") ? (
      <strong key={i}>{part.slice(8, -9)}</strong>
    ) : (
      part
    )
  );

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
              {(() => {
                const arr = t("projectPurpose.paragraphs", {
                  returnObjects: true,
                });
                const safeArr = Array.isArray(arr) ? arr : [];
                return safeArr.map((para, index) => (
                  <p key={index} className="purpose-paragraph">
                    {renderRich(para)}
                  </p>
                ));
              })()}
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
                const arr = t("article26.paragraphs", {
                  returnObjects: true,
                });
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
