import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'

const NavLinks = ({ className }) => {
  const { t } = useTranslation("home", { ns: "home" });
  return (
    <ul className={className}>
      <li>
        <NavLink exact="true" to="/" activeclassname="active">
          {t("homeLink")}
        </NavLink>
      </li>
      <li>
        <NavLink to={t("aboutLink")} activeclassname="active">
          {t("aboutLink")}
        </NavLink>
      </li>
      <li>
        <NavLink to={t("coursesLink")} activeclassname="active">
          {t("coursesLink")}
        </NavLink>
      </li>
      <li>
        <NavLink to={t("pagesLink")} activeclassname="active">
          {t("pagesLink")}
        </NavLink>
      </li>
      <li>
        <NavLink to={t("contactLink")} activeclassname="active">
          {t("contactLink")}
        </NavLink>
      </li>
    </ul>
  )
}

export default NavLinks