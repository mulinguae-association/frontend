import React, { Suspense, useEffect, useRef } from "react";
import "./Teachers.scss";
import "../pagesStyle.scss";
import { useTranslation } from "react-i18next";
import PrintBtn from "../../UI/PrintButton";
import TeachersOverview from "./TeachersOverview";
import { useLocation } from "react-router-dom";

const Teachers = () => {
  const { t } = useTranslation("pages/teachers");
  const { t: global } = useTranslation("global", { ns: "global" });
  const componentRef = useRef();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the corresponding section
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main>
      <div className="container">
        <section className="section multilingulism_info" ref={componentRef}>
          <div className="print_btn">
            <PrintBtn print={global("print")} componentRef={componentRef} />
          </div>
          <header className="teachersInfo">
            <h1 className="page_title">{t("page_title")}</h1>
            <p className="about">{t("sec1_about1")}</p>
          </header>
          <article className="Teachers_Students_Rel">
            <header>
              <h2 className="head">{t("sec2_head")}</h2>
            </header>
            <div className="about">
              <p>{t("sec2_about1")}</p>
              <p>{t("sec2_about2")}</p>
              <p>{t("sec2_about3")}</p>
            </div>
          </article>
          <article className="Methodology">
            <header>
              <h2 className="head">{t("sec3_head")}</h2>
            </header>
            <div className="about">
              <p>{t("sec3_about1")}</p>
              <p>{t("sec3_about2")}</p>
              <p>{t("sec3_about3")}</p>
              <p>{t("sec3_about4")}</p>
            </div>
          </article>
          <article className="Teachers_training">
            <header>
              <h2 className="head">{t("sec4_head")}</h2>
            </header>
            <div className="about">
              <p>{t("sec4_about1")}</p>
              <p>{t("sec4_about2")}</p>
              <p>{t("sec4_about3")}</p>
            </div>
          </article>
          <article id="benefits" className="Teachers_benefits">
            <header>{/* <h2 className="head">{t("sec5_head")}</h2> */}</header>
            <div className="about">
              {/* <p>{t("sec5_about1")}</p> */}
              <p>{t("sec5_about2")}</p>
              <p>
                <a className="link" href={`${t("sec5_link1")}`}>
                  {t("sec5_link1")}
                </a>
              </p>
              <p>
                <a className="link" href={`${t("sec5_link2")}`}>
                  {t("sec5_link2")}
                </a>
              </p>
              <p>
                <a className="link" href={`${t("sec5_link3")}`}>
                  {t("sec5_link3")}
                </a>
              </p>
              <p>
                <a className="link" href={`${t("sec5_link4")}`}>
                  {t("sec5_link4")}
                </a>
              </p>
              <p>
                <a className="link" href={`${t("sec5_link5")}`}>
                  {t("sec5_link5")}
                </a>
              </p>
            </div>
          </article>
          <section>
            <header>
              <h2 className="teachers_head">
                {t("sec6_head")}{" "}
                <span className="special">{t("sec6_head_special")}</span>
              </h2>
            </header>
            <div id="meetOurTeachers" className="teachers_overview">
              <Suspense fallback="Loading....">
                <TeachersOverview t={t} />
              </Suspense>
            </div>
          </section>
          <footer>
            <p className="warning">{t("warning")}</p>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default Teachers;
