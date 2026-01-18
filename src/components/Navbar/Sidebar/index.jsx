import React from "react";
import "./Sidebar.scss";
import LanguageSwitcher from "../../LanguageSwitcher";
import NavLinks from "../NavLinks";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext.jsx";
import { langDirection } from "../../../utils/languageUtils";
import { Link } from "react-router-dom";
import i18n from "../../../i18n";
const Sidebar = (props) => {
  const changeDir = langDirection();
  const { isLoading } = useContext(AppContext);
  const handleEvent = (e) => {
    const sideLinks = document.querySelector(".sideLinks");
    const allLinks = sideLinks.querySelectorAll("a");
    const pagseLink = allLinks[2];

    const target = e.target;
    if (
      target.tagName === "SPAN" ||
      target.tagName === "A" ||
      target.tagName === "BUTTON"
    ) {
      !isLoading && props.setMenuOpen(false);
      if (target === pagseLink) {
        props.setMenuOpen(true);
      }
    }
  };
  return (
    <div
      onClick={handleEvent}
      className={`sidebar ${props.menuOpen ? "open" : ""}`}
    >
      <Link
        to={`${i18n.language}/contact`}
        name="join us"
        className="cta-button"
        aria-label="join us"
      >
        {props.t("joinBtn")}
      </Link>
      <NavLinks className={`sideLinks ${changeDir}`} />
      <LanguageSwitcher className={"custom-dropdown"} />
    </div>
  );
};

export default Sidebar;
