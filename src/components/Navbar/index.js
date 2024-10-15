// Navbar.js

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Navbar.scss";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavLinks from "./NavLinks";
const Sidebar = React.lazy(() => import("./Sidebar"));

const Navbar = () => {
	const { i18n: { language: lang }, i18n } = useTranslation("home", { ns: "home" });
	const t = useMemo(() => i18n.getFixedT(lang, "home"), [lang, i18n]);
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const navRef = useRef();
	const contentRef = useRef();
	const logoRef = useRef();

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

	useEffect(() => {
		const handleWindowResize = () => {
			if (window.innerWidth <= 991) {
				contentRef.current.classList.add("rtl");
				logoRef.current.classList.add("rtl");
			} else {
				contentRef.current.classList.remove("rtl");
				logoRef.current.classList.remove("rtl");
				setMenuOpen(false);
			}
		};

		handleWindowResize(); // Check initial window width

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [contentRef, logoRef, navRef]);

	return (
		<nav className={`navbar`}>
			<div className='container'>
				<div className='content' ref={contentRef}>
					<div className='logo' ref={logoRef} onClick={() => navigate(`/${lang}/`)}>

						<picture className='img_container'>
							<source srcSet="/images/acs-logo.webp" type="image/webp" />
							<img
								width="100%"
								height="100%"
								src={"/images/acs-logo.png"}
								sizes="(max-width:768px) 50px, 55px"
								alt='logo'
							/>
						</picture>
						<span className='logo_title'>ACS Mulingua</span>
					</div>
					<NavLinks t={t} className={"nav-links"} />
					<div className='nav__buttons'>
						<Link to={`/${i18n.language}/contact`} name='join us' className='cta-button' aria-label='join us'>
							{t("joinBtn")}
						</Link>
						<LanguageSwitcher className='custom-dropdown' />
					</div>
					<div
						id='burger_menu'
						className={menuOpen ? "open" : ""}
						onClick={handleBurgerMenu}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<React.Suspense>
						<Sidebar setMenuOpen={setMenuOpen} t={t} menuOpen={menuOpen} />
					</React.Suspense>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
