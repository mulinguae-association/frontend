import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../HeaderPages/Header';
import "./About.scss"
import Footer from '../FooterPages/Footer';
import PrintBtn from '../PrintButton/PrintBtn';
import { useRef } from 'react';
const About = () => {
  const { t } = useTranslation("about", { ns: "about" });
  const { t: global } = useTranslation("global", { ns: "global" });
  const componentRef = useRef()
  return (
    <main className='about_us' >
      <Header pageName={t("currLink")} />
      <section className='about_us_info' ref={componentRef}>
        <div className='container'>
          <PrintBtn print={global("print")} componentRef={componentRef} />
          <div className='our_mission'>
            <h2 className='header'>{t("mission_head")}</h2>
            <p className='about'>
              {t("about_mission")}
            </p>
            <p className='about'>
              {t("about_mission2")}
            </p>
          </div>
          <div className='our_story'>
            <h2 className='header'>{t("story_head")}</h2>
            <p className='about'>
              {t("about_story")}
            </p>
          </div>
          <div className='our_vision'>
            <h2 className='header'>{t("vision_head")}</h2>
            <p className='about'>
              {t("about_vision")}
            </p>
          </div>
          <div className='our_tutors'>
            <h2 className='header'>{t("tutors_head")}</h2>
            <p className='about'>
              {t("about_tutors")}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default About