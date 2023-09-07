import React, { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./NestedNavLinks.scss"
import { useTranslation } from 'react-i18next'
const NestedNavLinks = (props) => {
  const { t } = useTranslation("pages/pagesLinks")
  const NestedLinksRef = useRef(null)
  const handleClickOutside = (event) => {
    if (NestedLinksRef.current &&
      !NestedLinksRef.current.contains(event.target) &&
      !NestedLinksRef.current.parentNode.contains(event.target)
    ) {
      props.setIsCurrElement(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
  return (

    <div ref={NestedLinksRef} className='nestedNavLinks'>
      <ul className='nestedNavContainer'>
        <li>
          <NavLink
            to="/pages/Multilingualism"
            activeclassname="active"
          >
            {t('Multilingualism')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pages/Linguicide"
            activeclassname="active"
          >
            {t('Linguicide')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pages/Teachers"
            activeclassname="active"
          >
            {t('Teachers')}
          </NavLink>
        </li>
        <li>
          <Link
            to="/pages/Teachers#meetOurTeachers"
            activeclassname="active"
          >
            {t("Meet our teachers")}
          </Link>
        </li>
        <li>
          <NavLink
            to="/pages/Students"
            activeclassname="active"
          >
            {t('Students')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pages/Blogs"
            activeclassname="active"
          >
            {t('Blogs')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pages/100-basic-phrases/"
            activeclassname="active"
          >
            {t("100 basic phrases")}
          </NavLink>
        </li>
      </ul >
      <img className='book_list' src='/images/icons/BooksList.png' alt="BooksList" />
    </div>
  )
}

export default NestedNavLinks