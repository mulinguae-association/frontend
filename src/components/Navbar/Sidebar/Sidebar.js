import React from 'react'
import "./Sidebar.scss"
import LanguageSwitcher from '../../LanguageSwitcher'
import NavLinks from '../NavLinks/NavLinks'
const Sidebar = (props) => {
  const handleEvent = (e) => {
    const sideLinks = document.querySelector(".sideLinks")
    const allLinks = sideLinks.querySelectorAll("a")
    const pagseLink = allLinks[2]

    const target = e.target
    if (target.tagName === "SPAN" || target.tagName === "A" || target.tagName === "BUTTON") {
      props.setMenuOpen(false)
      if (target === pagseLink) {
        props.setMenuOpen(true)

      }
    }
  }
  return (
    <div onClick={handleEvent} className={`sidebar ${props.menuOpen ? 'open' : ''}`}>
      <button name='join us' className="cta-button" aria-label='join us'>{props.t("joinBtn")}</button>
      <NavLinks className={"sideLinks change_direction"} />
      <LanguageSwitcher className={"custom-dropdown"} />
    </div>
  )
}

export default Sidebar