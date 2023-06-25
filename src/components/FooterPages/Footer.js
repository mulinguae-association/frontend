import React from 'react'
import "./footer.scss"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Footer = () => {
  const { t } = useTranslation("footer", { ns: "footer" })
  return (
    <footer>
      <div className='top_footer change_direction'>
        <div className='container'>
          <div className='footer_list'>
            <div className='footer_links'>
              <div className='col'>
                <h3 className='footer_head'>{t("LearnM_title")}</h3>
                <ul className="list_item">
                  <li className='item'><Link className='link_item' to="/about">{t("link")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link1")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link2")}</Link></li>
                  <li className='item'><Link className='link_item' to="/contact">{t("link3")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link4")}</Link></li>
                </ul>
              </div>
              <div className='col'>
                <h3 className='footer_head'>{t("ProudlyS_title")}</h3>
                <ul className="list_item">
                  <li className='item'><Link className='link_item' to="">{t("link5")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link6")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link7")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link8")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link9")}</Link></li>
                </ul>
              </div>
              <div className='col'>
                <h3 className='footer_head'>{t("JoinUs_title")}</h3>
                <ul className="list_item">
                  <li className='item'><Link className='link_item' to="">{t("link10")}</Link></li>
                  <li className='item'><Link className='link_item' to="">{t("link11")}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom_footer'>
        <div className='container'>
          <div className='content'>
            <div className='info'>
              <p>
                <span><Link to="">{t("link12")}</Link></span>
                <span>|</span>
                <span><Link to="">{t("link13")}</Link></span>
                <span>|</span>
                <span><Link to="">{t("link14")}</Link></span>
              </p>
              <p>{t("copyRight")}</p>
              <p>{t("copyRight2")}
              </p>
            </div>
            <div className='social_links'>
              <img className="icon" src={process.env.PUBLIC_URL + '/images/icons/facebook.png'} width="40" height="40" alt='facebook' />
              <img className="icon" src={process.env.PUBLIC_URL + '/images/icons/twitter.png'} width="40" height="40" alt='twitter' />
              <img className="icon" src={process.env.PUBLIC_URL + '/images/icons/linkedIn.png'} width="40" height="40" alt='linkedIn' />
              <img className="icon" src={process.env.PUBLIC_URL + '/images/icons/instagram.png'} width="40" height="40" alt=' instgram' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer