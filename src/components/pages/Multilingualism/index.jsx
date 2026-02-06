import React, { useRef } from "react";
import "./Multilingualism.scss";
import "../pagesStyle.scss";
import { useTranslation } from "react-i18next";
import PrintBtn from "../../UI/PrintButton";

const Multilingualism = () => {
  const { t } = useTranslation("pages/multilingualism", {
    ns: "pages/multilingualism",
  });
  const langFactsRaw = t("about_langFacts", { returnObjects: true });
  const langFactsArr = Array.isArray(langFactsRaw) ? langFactsRaw : [];
  const { t: global } = useTranslation("global", { ns: "global" });
  const componentRef = useRef();

  return (
    <main>
      <div className="container">
        <article className="section multilingulism_info" ref={componentRef}>
          <div className="print_btn">
            <PrintBtn print={global("print")} componentRef={componentRef} />
          </div>
          <header>
            <h1 className="page_title">{t("page_title")}</h1>
          </header>
          <section>
            <h2 className="head">{t("definition_head")}</h2>
            <div className="about">
              <p>{t("about_definition")}</p>
              <p>{t("about_definition2")}</p>
              <p>{t("about_definition3")}</p>
              <p>{t("about_definition4")}</p>
              <p>{t("about_definition5")}</p>
            </div>
          </section>
          <section>
            <h2 className="head">{t("importanceLanguage_head")}</h2>
            <div className="about">
              <p>{t("about_importanceLang")}</p>
              <p>
                {t("about_importanceLang2")}
                <a
                  className="link"
                  href="https://www.un.org/en/about-us/universal-declaration-of-human-rights"
                >
                  {t("link")}
                </a>
                {t("about_importanceLang3")}
                <a
                  className="link"
                  href="https://www.unesco.org/en/legal-affairs/recommendation-concerning-promotion-and-use-multilingualism-and-universal-access-cyberspace?hub=66535"
                >
                  {t("link2")}
                </a>
                {t("about_importanceLang4")}
              </p>
              <p>
                {t("about_importanceLang5")}
                <a
                  className="link"
                  href="https://documents-dds-ny.un.org/doc/UNDOC/GEN/N19/426/26/PDF/N1942626.pdf?OpenElement"
                >
                  {t("link3")}
                </a>
              </p>
              <p>
                {t("about_importanceLang6")}
                <a className="link" href="https://idil2022-2032.org/">
                  {t("link4")}
                </a>
                {t("about_importanceLang7")}
              </p>
            </div>
          </section>
          <section>
            <h2 className="head">{t("linguaFranca_head")}</h2>
            <div className="about">
              <p>
                {t("about_linguaFranca")}
                <a
                  className="link"
                  href="https://www.un.org/fr/department-global-communications"
                >
                  {t("link5")}
                </a>
                {t("about_linguaFranca2")}
                <a
                  className="link"
                  href="https://www.un.org/en/multilingualism-web-standards"
                >
                  {t("link6")}
                </a>
                <a
                  className="link"
                  href="https://www.un.org/en/our-work/official-languages"
                >
                  {t("link7")}
                </a>
              </p>
            </div>
          </section>
          <section className="languages_landscape">
            <h2 className="head">{t("langFacts_head")}</h2>
            <ol className="about">
              {langFactsArr.map((fact, idx) => (
                <li className="about" key={idx}>
                  <span>{fact.title}</span>
                  <span>{t(fact?.title2)}</span>
                  <span>
                    <a className="link" href={fact?.link}>
                      {t(fact?.link)}
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>
    </main>
  );
};

export default Multilingualism;
