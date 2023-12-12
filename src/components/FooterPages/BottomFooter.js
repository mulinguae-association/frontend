import i18next from 'i18next'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const BottomFooter = () => {
  const { t } = useTranslation("footer", { ns: "footer" });
  return (
    <div className='bottom_footer'>
      <div className='container'>
        <div className='content'>
          <div className='info'>
            <p>
              <span>
                <Link to={`/${i18next.language}/privacy-policy`}>{t("link12")}</Link>
              </span>
              <span>|</span>
              <span>
                <Link to={`/${i18next.language}/`}>{t("link13")}</Link>
              </span>
              <span>|</span>
              <span>
                <Link to={`/${i18next.language}/`}>{t("link14")}</Link>
              </span>
            </p>
            <p>{t("copyRight")}</p>
            <p>{t("copyRight2")}</p>
          </div>
          <div className='social_links'>
            <img
              className='icon'
              src={"/images/icons/facebook.png"}
              width='40'
              height='40'
              alt='facebook'
            />
            <img
              className='icon'
              src={"/images/icons/twitter.png"}
              width='40'
              height='40'
              alt='twitter'
            />
            <img
              className='icon'
              src={"/images/icons/linkedIn.png"}
              width='40'
              height='40'
              alt='linkedIn'
            />
            <img
              className='icon'
              src={"/images/icons/instagram.png"}
              width='40'
              height='40'
              alt=' instgram'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomFooter