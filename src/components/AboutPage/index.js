import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../HeaderPages';
import "./About.scss"
import Footer from '../FooterPages';
import PrintBtn from '../PrintButton';
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
            <div className='title'>
              <h2 className='header'>{t("mission_head")}</h2>
              <img src='/images/icons/ourMissionIcon.svg' alt="our mission" />
            </div>
            <p className='about'>
              {t("about_mission")}
            </p>
            <p className='about'>
              {t("about_mission2")}
            </p>
          </div>
          <div className='our_story'>
            <div className='title'>
              <h2 className='header'>{t("story_head")}</h2>
              <img src='/images/icons/ourStoryIcon.svg' alt="our story" />
            </div>
            <p className='about'>
              {t("about_story")}
            </p>
          </div>
          <div className='our_vision'>
            <div className='title'>
              <h2 className='header'>{t("vision_head")}</h2>
              <img src='/images/icons/ourVisionIcon.svg' alt="our vision" />
            </div>
            <p className='about'>
              {t("about_vision")}
            </p>
          </div>
          <div className='our_tutors'>
            <div className='title'>
              <h2 className='header'>{t("tutors_head")}</h2>
              <img src='/images/icons/ourTutorsIcon.svg' alt="our tutors" />
            </div>
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