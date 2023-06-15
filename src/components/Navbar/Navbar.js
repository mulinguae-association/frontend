// Navbar.js

import React, { useEffect, useRef, useState } from 'react';
import './Navbar.scss';
import LanguageSwitcher from '../LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar/Sidebar';
import NavLinks from './NavLinks';

const Navbar = () => {
  const { t } = useTranslation("home", { ns: "home" });
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleBurgerMenu = () => {
    setMenuOpen((prev) => !prev)
  }
  const navRef = useRef()
  const contentRef = useRef()
  const logoRef = useRef()
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 991) {
        contentRef.current.classList.add("rtl")
        logoRef.current.classList.add("rtl")
      } else {
        contentRef.current.classList.remove("rtl")
        logoRef.current.classList.remove("rtl")
        setMenuOpen(false)
      }
    };

    handleWindowResize(); // Check initial window width

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [contentRef, logoRef, navRef]);

  return (
    <nav className={`navbar ${menuOpen ? "fixed" : ""}`}>
      <div className="container">
        <div className="content" ref={contentRef}>
          <div className="logo" ref={logoRef} onClick={() => navigate("/")}>
            <img src='images/cahuacLogo.png' alt="logo" />
            <span className='logo_title'>
              ACS Mulingua
            </span>
          </div>
          <NavLinks t={t} className={"nav-links"} />
          <div className="nav__buttons">
            <button className="cta-button">{t("joinBtn")}</button>
            <LanguageSwitcher className="custom-dropdown" />
          </div>
          <div id='burger_menu' className={menuOpen ? "open" : ""} onClick={handleBurgerMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Sidebar setMenuOpen={setMenuOpen} t={t} menuOpen={menuOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
