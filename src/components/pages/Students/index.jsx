import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import PrintBtn from "../../PrintButton";
import { SEO } from "../../SEO";
import "./Students.scss";
import "../pagesStyle.scss";

const Students = () => {
  const { t } = useTranslation("pages/students");
  const { t: global } = useTranslation("global");
  const componentRef = useRef();

  return (
    <>
      <SEO
        title="Mulinguae Students | Language Learners & Multilingual Community"
        description="Meet the students of Mulinguae (Mulingua). Join our multilingual community of language learners and connect with people worldwide. Discover language learning stories and experiences."
        keywords="mulingua students, mulinguae students, language learners, multilingual, language learning, global community"
        path="/pages/students"
      />
      <main>
        <div className="container">
          <section
            className="section students multilingulism_info"
            ref={componentRef}
          >
            <div className="print_btn">
              <PrintBtn print={global("print")} componentRef={componentRef} />
            </div>
            <header>
              <h2 className="page_title">{t("page_title")}</h2>
            </header>
            <article className="group">
              <div className="students_img">
                <img src="/images/studentsImg.jpg" alt="students-img" />
              </div>
              <div>
                <p>{t("sec1_about1")}</p>
                <p>{t("sec1_about2")}</p>
                <p>{t("sec1_about3")}</p>
                <p>{t("sec1_about4")}</p>
                <p>{t("sec1_about5")}</p>
                <p>{t("sec1_about6")}</p>
                <p>{t("sec1_about7")}</p>
                <p>{t("sec1_about8")}</p>
                <nav>
                  <p>
                    <a className="link" href={`${t("sec1_link1")}`}>
                      {t("sec1_link1")}
                    </a>
                  </p>
                  <p>
                    <a className="link" href={`${t("sec1_link2")}`}>
                      {t("sec1_link2")}
                    </a>
                  </p>
                  <p>
                    <a className="link" href={`${t("sec1_link3")}`}>
                      {t("sec1_link3")}
                    </a>
                  </p>
                  <p>
                    <a className="link" href={`${t("sec1_link4")}`}>
                      {t("sec1_link4")}
                    </a>
                  </p>
                </nav>
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
};

export default Students;
