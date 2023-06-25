import React from 'react'
import { useTranslation } from 'react-i18next';
import "./Home.scss"
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
const Home = ({ imgAnimation }) => {
  const { t } = useTranslation("home", { ns: "home" });
  const langAr = i18n.language === "Ar" // check if language is Arabic
  const langQu = i18n.language === "Qu" // check if language is Arabic
  return (
    <header className='hero_section'>
      <div className='container'>
        <div className='hero_content'>
          <div className='hero_info'>
            <h1 id='websiteName' style={langQu ? { fontSize: "2.2rem" } : {}} className='hero_title'>{t("hero_title").split("\\n").join("\n")}</h1>
            <div className={`img_info_container ${imgAnimation ? "reload-animation" : ""} `}>
              <picture>
                <source type='image/webp' srcSet={process.env.PUBLIC_URL + '/images/multi-culture.png'}></source>
                <source type='image/png' srcSet={process.env.PUBLIC_URL + '/images/multi-culture.png'}></source>
                <img src={process.env.PUBLIC_URL + '/images/multi-culture.png'} alt='multiLang_img' />
              </picture>
            </div>
            <p id='websiteDescription' style={langQu ? { textAlign: "initial" } : {}} className='hero_description'>
              <span>{t("before_des_link")}</span>
              <Link className='des_link' to="/courses">{t("first_link")}</Link>
              <span>{t("after_des_link")}</span>
              <Link className='des_link' to="/pages/Multilingualism">{t("second_link")}</Link>
              <span>{t("after_des_link2")}</span>
              <Link className='des_link' to="/">{t("third_link")}</Link>
              <span>{t("last_des_link")}</span>
            </p>
            <Link className='hero_btn change_direction' to="/About">
              <div>
                <button name='read-more' type='button' aria-labelledby='websiteName websiteDescription'>
                  {t("hero_button")}
                </button>
                <span className={`arrow arrow-first ${langAr ? "change_dir" : ""}`}></span>
                <span className={`arrow arrow-second ${langAr ? "change_dir" : ""}`}></span>
              </div>
            </Link>
          </div>
          <div className={`img_container reload-animation  ${imgAnimation ? "reload-animation" : ""}`}>
            <picture>
              <source type='image/webp' srcSet='images/multi-culture.webp'></source>
              <source type='image/png' srcSet='images/multi-culture.png'></source>
              <img src={process.env.PUBLIC_URL + 'images/multi-culture.png'} alt='multiLang_img' />
            </picture>
          </div>
        </div>
      </div>
    </header >
  )
}
export default Home