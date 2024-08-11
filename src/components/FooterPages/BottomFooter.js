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
            <picture>
              <source srcSet='/images/icons/facebook.avif' type='image/avif' />
              <source srcSet='/images/icons/facebook.webp' type='image/webp' />
              <img
                className='icon'
                src='/images/icons/facebook.png'
                width='40'
                height='40'
                alt='facebook'
              />
            </picture>
            <picture>
              <source srcSet='/images/icons/twitter.avif' type='image/avif' />
              <source srcSet='/images/icons/twitter.webp' type='image/webp' />
              <img
                className='icon'
                src='/images/icons/twitter.png'
                width='40'
                height='40'
                alt='twitter'
              />
            </picture>
            <picture>
              <source srcSet='/images/icons/linkedIn.avif' type='image/avif' />
              <source srcSet='/images/icons/linkedIn.webp' type='image/webp' />
              <img
                className='icon'
                src='/images/icons/linkedIn.png'
                width='40'
                height='40'
                alt='linkedIn'
              />
            </picture>
            <picture>
              <source srcSet='/images/icons/instagram.avif' type='image/avif' />
              <source srcSet='/images/icons/instagram.webp' type='image/webp' />
              <img
                className='icon'
                src='/public/images/icons/images/instagram.png'
                width='40'
                height='40'
                alt='instagram'
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomFooter