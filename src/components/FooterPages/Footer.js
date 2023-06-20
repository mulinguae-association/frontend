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
                  <li className='item'><Link className='link_item' to="">About Us</Link></li>
                  <li className='item'><Link className='link_item' to="">Our classes</Link></li>
                  <li className='item'><Link className='link_item' to="">FAQ</Link></li>
                  <li className='item'><Link className='link_item' to="">Contact US</Link></li>
                  <li className='item'><Link className='link_item' to="">Site Map</Link></li>
                </ul>
              </div>
              <div className='col'>
                <h3 className='footer_head'>{t("ProudlyS_title")}</h3>
                <ul className="list_item">
                  <li className='item'><Link className='link_item' to="">Education for all</Link></li>
                  <li className='item'><Link className='link_item' to="">Students of all ages</Link></li>
                  <li className='item'><Link className='link_item' to="">Libraries</Link></li>
                  <li className='item'><Link className='link_item' to="">Tutors Benefits</Link></li>
                  <li className='item'><Link className='link_item' to="">Unity & solidarity</Link></li>
                </ul>
              </div>
              <div className='col'>
                <h3 className='footer_head'>{t("JoinUs_title")}</h3>
                <ul className="list_item">
                  <li className='item'><Link className='link_item' to="">Work with Us</Link></li>
                  <li className='item'><Link className='link_item' to="">Become a Tutor</Link></li>
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
                <span><Link to="">Privacy Policy</Link></span>
                <span>|</span>
                <span><Link to="">Privacy Notice</Link></span>
                <span>|</span>
                <span><Link to="">Terms of Use</Link></span>
              </p>
              <p>©2023 ACS Mulingua.com </p>
              <p>ACS Mulingua.com is controlled by ACS, a non profit association
                situated in Lima, Peru.</p>
            </div>
            <div className='social_links'>
              <img className="icon" src='images/icons/facebook.png' width="40" height="40" alt='facebook' />
              <img className="icon" src='images/icons/twitter.png' width="40" height="40" alt='twitter' />
              <img className="icon" src='images/icons/linkedIn.png' width="40" height="40" alt='linkedIn' />
              <img className="icon" src='images/icons/instagram.png' width="40" height="40" alt=' instgram' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer