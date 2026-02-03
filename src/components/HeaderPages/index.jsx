import "./Header.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CircleBackground from "../animations/CircleBackground";
const Header = ({ pageName }) => {
  const { t } = useTranslation("header", { ns: "header" });
  return (
    <div className="header_pages ">
      <div className="container">
        <CircleBackground count={50} className="circle-background-home" />
        <div className="wrapper_container">
          <ul className="breadcrumb">
            <li className="breadcrumb_item">
              <Link to="/">{t("homeLink")}</Link>
            </li>
            <li className="breed_slash">/</li>
            <li className="breadcrumb_item" aria-current="page">
              {pageName}
            </li>
          </ul>
          <div className="content">
            <div className="breed_crumb">
              <h1>ACS Mulingua</h1>
              <p>{t("header_title")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1707328329">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(242, 245, 247,0.7)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(242, 245, 247,0.5)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(242, 245, 247,1)"
            />
            <use href="#gentle-wave" x="48" y="7" fill="transparent" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
