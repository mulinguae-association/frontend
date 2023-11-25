import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { langDirection } from '../../utils/languageUtils';
import i18next from 'i18next'

const TopFooter = () => {
  const { t } = useTranslation("footer", { ns: "footer" });
  const changeDir = langDirection();
  return (
    <div className={`top_footer ${changeDir}`}>
      <div className='container'>
        <div className='footer_list'>
          <div className='footer_links'>
            <div className='col'>
              <h3 className='footer_head'>{t("LearnM_title")}</h3>
              <ul className='list_item'>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/about`}>
                    {t("link")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/courses`}>
                    {t("link1")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link2")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/contact`}>
                    {t("link3")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link4")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col'>
              <h3 className='footer_head'>{t("ProudlyS_title")}</h3>
              <ul className='list_item'>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link5")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link6")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link7")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/pages/Teachers#benefits`}>
                    {t("link8")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link9")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col'>
              <h3 className='footer_head'>{t("JoinUs_title")}</h3>
              <ul className='list_item'>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link10")}
                  </Link>
                </li>
                <li className='item'>
                  <Link className='link_item' to={`/${i18next.language}/`}>
                    {t("link11")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopFooter