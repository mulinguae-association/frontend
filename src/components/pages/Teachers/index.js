import React, { useEffect, useRef } from 'react'
import "./Teachers.scss"
import "../pagesStyle.scss"
import { useTranslation } from 'react-i18next';
import PrintBtn from '../../PrintButton';
import TeachersOverview from "./TeachersOverview"
import { useLocation } from 'react-router-dom';

const Teachers = () => {
  const { t } = useTranslation('pages/teachers', { ns: 'teachers' });
  const { t: global } = useTranslation('global', { ns: 'global' });
  const componentRef = useRef();
  const location = useLocation()
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the corresponding section
    const hash = window.location.hash;
    console.log(hash)
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <main>
      <div className='container'>
        <section className='section multilingulism_info' ref={componentRef}>
          <div className='print_btn'>
            <PrintBtn print={global("print")} componentRef={componentRef} />
          </div>
          <div className='teachersInfo'>
            <h2 className='page_title'>{t("page_title")}</h2>
            <p className='about'>{t("sec1_about1")}</p>
          </div>
          <div className='Teachers_Students_Rel'>
            <h2 className='head'>{t("sec2_head")}</h2>
            <p className='about'>{t("sec2_about1")}</p>
            <p className='about'>{t("sec2_about2")}</p>
            <p className='about'>{t("sec2_about3")}</p>
          </div>
          <div className='Methodology'>
            <h2 className='head'>{t("sec3_head")}</h2>
            <p className='about'>{t("sec3_about1")}</p>
            <p className='about'>{t("sec3_about2")}</p>
            <p className='about'>{t("sec3_about3")}</p>
            <p className='about'>{t("sec3_about4")}</p>
          </div>
          <div className='Teachers_training'>
            <h2 className='head'>{t("sec4_head")}</h2>
            <p className='about'>{t("sec4_about1")}</p>
            <p className='about'>{t("sec4_about2")}</p>
            <p className='about'>{t("sec4_about3")}</p>
          </div>
          <div id='benefits' className='Teachers_benefits'>
            <h2 className='head'>{t("sec5_head")}</h2>
            <p className='about'>{t("sec5_about1")}</p>
            <p className='about'>{t("sec5_about2")}</p>
            <p className='about'>
              <a className='link' href={`${t("sec5_link1")}`}>
                {t("sec5_link1")}
              </a>
            </p>
            <p className='about'>
              <a className='link' href={`${t("sec5_link2")}`}>
                {t("sec5_link2")}
              </a>
            </p>
            <p className='about'>
              <a className='link' href={`${t("sec5_link3")}`}>
                {t("sec5_link3")}
              </a>
            </p>
            <p className='about'>
              <a className='link' href={`${t("sec5_link4")}`}>
                {t("sec5_link4")}
              </a>
            </p>
            <p className='about'>
              <a className='link' href={`${t("sec5_link5")}`}>
                {t("sec5_link5")}
              </a>
            </p>
          </div>
          <div id="meetOurTeachers" className='teachers_overview '>
            <h3 className='teachers_head'>{t("sec6_head")} <span className='special'>{t("sec6_head_special")}</span></h3>
            <TeachersOverview t={t} />
          </div>
          <p className='warning'>{t("warning")}</p>
        </section>
      </div>
    </main >
  )
}

export default Teachers