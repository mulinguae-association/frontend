import React from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom'
const Header = ({ t, pageName }) => {

  return (
    <div className='header_pages change_direction'>
      <div className='container'>
        <div className='wrapper_container'>
          <ol className="breadcrumb">
            <li className="breadcrumb_item"><Link to="/">{t("homeLink")}</Link></li>
            <li className='breed_slash'>/</li>
            <li className="breadcrumb_item" aria-current="page">{pageName}</li>
          </ol>
          <div className='content'>
            <div className='breed_crumb'>
              <h1>ACS Mulingua</h1>
              <p>{t("header_title")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header