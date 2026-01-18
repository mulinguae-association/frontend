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
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
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
            </a>

            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
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
            </a>

            <a
              href='https://www.linkedin.com/in/acs-asociaci%C3%B3n-ccahuac-solidarity-0a5565309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
              target='_blank'
              rel='noopener noreferrer'>
              <picture>
                <source srcSet='/images/icons/linkedIn.avif' type='image/avif' />
                <source srcSet='/images/icons/linkedIn.webp' type='image/webp' />
                <img
                  className='icon'
                  src='/images/icons/linkedIn.png'
                  width='40'
                  height='40'
                  alt='linkedin'
                />
              </picture>
            </a>

            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
              <picture>
                <source srcSet='/images/icons/instagram.avif' type='image/avif' />
                <source srcSet='/images/icons/instagram.webp' type='image/webp' />
                <img
                  className='icon'
                  src='/images/icons/instagram.png'
                  width='40'
                  height='40'
                  alt='instagram'
                />
              </picture>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BottomFooter