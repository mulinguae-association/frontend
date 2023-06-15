import React from 'react'
import "./Sidebar.scss"
import LanguageSwitcher from '../../LanguageSwitcher'
import NavLinks from '../NavLinks'
const Sidebar = (props) => {
  const handleEvent = (e) => {
    const target = e.target
    if (target.tagName === "SPAN" || target.tagName === "A" || target.tagName === "BUTTON") {
      props.setMenuOpen(false)
    }
  }
  return (
    <div onClick={handleEvent} className={`sidebar ${props.menuOpen ? 'open' : ''}`}>
      <button className="cta-button">{props.t("joinBtn")}</button>
      <NavLinks className={"sideLinks change_direction"} />
      <LanguageSwitcher className={"custom-dropdown"} />
    </div>
  )
}

export default Sidebar