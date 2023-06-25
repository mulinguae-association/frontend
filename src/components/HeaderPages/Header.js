import "./Header.scss";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
const Header = ({ pageName }) => {
  const { t } = useTranslation("header", { ns: "header" });
  return (
    <div className='header_pages '>
      <div className='container'>
        <div className='wrapper_container'>
          <ul className="breadcrumb">
            <li className="breadcrumb_item"><Link to="/">{t("homeLink")}</Link></li>
            <li className='breed_slash'>/</li>
            <li className="breadcrumb_item" aria-current="page">{pageName}</li>
          </ul>
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