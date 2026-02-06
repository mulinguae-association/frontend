// Navbar.js

import React, { useEffect, useMemo, useRef, useState } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import "./Navbar.scss";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import NotificationBell from "../NotificationBell";
import { useContext } from "react";
import { BlogPostsContext } from "../../contexts/BlogsContext";
import { useTranslation } from "react-i18next";
import NavLinks from "./NavLinks";
import IntroVideoModal from "../IntroVideoModal";
import { getIntroVideo } from "../../config";
const Sidebar = React.lazy(() => import("./Sidebar"));

const Navbar = () => {
  const navigate = useNavigate();
  const {
    i18n: { language: lang },
    i18n,
  } = useTranslation("home", { ns: "home" });
  const t = useMemo(() => i18n.getFixedT(lang, "home"), [lang, i18n]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const navRef = useRef();
  const contentRef = useRef();
  const logoRef = useRef();
  let VIDEO_LINK = "";
  // normalize language to two-letter code (handles en-US, fr-FR, etc.)
  const shortLang = (lang || "").split("-")[0];
  // Prefer the JSON config (editable) but fall back to env vars
  VIDEO_LINK = getIntroVideo(shortLang) || "";

  const handleBurgerMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  //remove scroll when sidebar apear
  useEffect(() => {
    if (menuOpen) {
      document.querySelector("html").style.overflow = "hidden";
    } else {
      document.querySelector("html").style.overflow = "visible";
    }
  }, [menuOpen]);
  const { notifications = [], setNotifications } =
    useContext(BlogPostsContext) || {};

  const { width } = useWindowResize();
  useEffect(() => {
    // Show intro only on first visit
    try {
      const seen = localStorage.getItem("mulingua_seen_intro");
      if (!seen) {
        setShowIntro(true);
        localStorage.setItem("mulingua_seen_intro", "1");
      }
    } catch (e) {
      // ignore storage errors
    }
    if (width <= 991) {
      contentRef.current.classList.add("rtl");
      logoRef.current.classList.add("rtl");
    } else {
      contentRef.current.classList.remove("rtl");
      logoRef.current.classList.remove("rtl");
      setMenuOpen(false);
    }
  }, [width, contentRef, logoRef, navRef]);

  return (
    <nav className={`navbar-sidebar`}>
      <div className="container">
        <div className="content" ref={contentRef}>
          <div
            className="logo"
            ref={logoRef}
            onClick={() => navigate(`/${lang}/`)}
          >
            <picture className="img_container">
              <source srcSet="/images/acs-logo.webp" type="image/webp" />
              <img
                width="100%"
                height="100%"
                src={"/images/acs-logo.png"}
                sizes="(max-width:768px) 50px, 55px"
                alt="Mulinguae Logo"
              />
            </picture>
            <span className="logo_title">Mulinguae</span>
          </div>
          <NavLinks t={t} className={"nav-links"} />
          <div className="nav__buttons">
            <NotificationBell
              notifications={notifications}
              setNotifications={setNotifications}
            />
            {/* <Link
              to={`/${i18n.language}/contact`}
              name="join us"
              className="cta-button"
              aria-label=" Join Mulinguae"
            >
              {t("joinBtn")}
            </Link> */}
            <button
              className="cta-outline watch-intro"
              onClick={() => setShowIntro(true)}
            >
              {t("watchIntro") || "Watch Intro"}
            </button>
            <LanguageSwitcher className="custom-dropdown" />
          </div>
          {/* Show NotificationBell next to burger menu on mobile */}
          {width <= 991 && (
            <div className="mobile-bell-burger">
              <NotificationBell
                notifications={notifications}
                setNotifications={setNotifications}
              />
              <div
                role="button"
                tabIndex={0}
                aria-label="Toggle menu button to change language"
                id="burger_menu"
                className={menuOpen ? "open" : ""}
                onClick={handleBurgerMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          {/* Burger menu is now rendered with NotificationBell above for mobile */}
          {width <= 991 && (
            <React.Suspense>
              <Sidebar setMenuOpen={setMenuOpen} t={t} menuOpen={menuOpen} />
            </React.Suspense>
          )}
          <IntroVideoModal
            show={showIntro}
            onClose={() => setShowIntro(false)}
            videoUrl={VIDEO_LINK}
            captionTracks={
              {
                // fr: "https://res.cloudinary.com/dfnwjr7vo/raw/upload/v1758699557/munlinguae_fr_xwfe16.vtt",
                // es: "https://res.cloudinary.com/dfnwjr7vo/raw/upload/v1758699556/mulinguae_es_lm4yf1.vtt",
              }
            }
            // captions={{ es: "es", fr: "fr" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
