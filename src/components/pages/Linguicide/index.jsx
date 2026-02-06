import React, { useRef } from "react";
import "./Linguicide.scss";
import "../pagesStyle.scss";
import { useTranslation } from "react-i18next";
import PrintBtn from "../../UI/PrintButton";

const Linguicide = () => {
  const { t } = useTranslation("pages/linguicide");
  const { t: global } = useTranslation("global", { ns: "global" });
  const componentRef = useRef();

  return (
    <main>
      <div className="container">
        <section className="section multilingulism_info" ref={componentRef}>
          <div className="print_btn">
            <PrintBtn print={global("print")} componentRef={componentRef} />
          </div>
          <header>
            <h1 className="page_title">{t("page_title")}</h1>
          </header>
          <article>
            <div className="about">
              <p>{t("sec1_about1")}</p>
              <p>
                <span>{t("sec1_about2")}</span>
                <br />
                <span>
                  <a
                    className="link"
                    href="https://www.harvardmagazine.com/2002/03/language-wars.html"
                  >
                    {t("sec1_link")}
                  </a>
                </span>
              </p>
            </div>
          </article>
          <article>
            <header>
              <h2 className="head">{t("sec2_head")}</h2>
            </header>
            <div className="about">
              <p>{t("sec2_about1")}</p>
              <p>{t("sec2_about2")}</p>
              <p>
                <span>{t("sec2_about3")}</span>
                <br />
                <span>
                  <a
                    className="link"
                    href="https://www.researchgate.net/publication/316622633_Linguicide_and_Linguicism"
                  >
                    {t("sec2_link1")}
                  </a>
                </span>
              </p>
              <p>
                <span>{t("sec2_about4")}</span>
                <br />
                <span>
                  <a className="link" href="https://languageconservancy.org/">
                    {t("sec2_link2")}
                  </a>
                </span>
              </p>
            </div>
          </article>
          <article>
            <header>
              <h2 className="head">{t("sec3_head")}</h2>
            </header>
            <div className="about">
              <p>{t("sec3_about")}</p>
              <p>
                <span> {t("sec3_about2")}</span>
                <br />
                <span>
                  <a
                    className="link"
                    href="https://www.researchgate.net/publication/316622633_Linguicide_and_Linguicism"
                  >
                    {t("sec3_link")}
                  </a>
                </span>
              </p>
            </div>
          </article>
          <article>
            <header>
              <h2 className="head">{t("sec4_head")}</h2>
            </header>
            <div className="about">
              <p>{t("sec4_about")}</p>
              <p>{t("sec4_about2")}</p>
              <p>{t("sec4_about3")}</p>
              <p>
                <a
                  className="link"
                  href="https://www.thoughtco.com/what-is-linguicism-1691238"
                >
                  {t("sec4_link")}
                </a>
              </p>
              <p>
                <a
                  className="link"
                  href="https://www.researchgate.net/publication/316622633_Linguicide_and_Linguicism"
                >
                  {t("sec4_link2")}
                </a>
              </p>
              <p>
                <a
                  className="link"
                  href="https://www.unesco.org/en/multilingualism-linguistic-diversity"
                >
                  {t("sec4_link3")}
                </a>
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Linguicide;
