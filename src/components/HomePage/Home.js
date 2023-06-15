import React from 'react'
import { useTranslation } from 'react-i18next';
import "./Home.scss"
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
const Home = () => {
  const { t } = useTranslation("home", { ns: "home" });
  const langAr = i18n.language === "Ar" // check if language is Arabic

  return (
    <section className='hero_section'>
      <div className='container'>
        <div className='hero_content'>
          <div className='hero_info'>
            <h1 className='hero_title'>{t("hero_title").split("\\n").join("\n")}</h1>
            <div className='img_info_container'>
              <img src='images/multi-culture.jpg' alt='test' />
            </div>
            <p className='hero_description'>
              <span>{t("before_des_link")}</span>
              <Link className='des_link' to="/courses">{t("first_link")}</Link>
              <span>{t("after_des_link")}</span>
              <Link className='des_link' to="/">{t("second_link")}</Link>
              <span>{t("after_des_link2")}</span>
              <Link className='des_link' to="/">{t("third_link")}</Link>
              <span>{t("last_des_link")}</span>
            </p>

            <Link className='hero_btn change_direction' to="/About">
              <div>
                <button>
                  {t("hero_button")}
                </button>
                <span className={`arrow arrow-first ${langAr ? "change_dir" : ""}`}></span>
                <span className={`arrow arrow-second ${langAr ? "change_dir" : ""}`}></span>
              </div>
            </Link>
          </div>
          <div className='img_container'>
            <img src='images/multi-culture.jpg' alt='test' />
          </div>
        </div>
      </div>
    </section >
  )
}

export default Home