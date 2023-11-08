import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import NestedNavLinks from './NestedNavLinks';

const NavLinks = ({ className }) => {
  const { t, i18n: { language: lang } } = useTranslation('home', { ns: 'home' });
  const [isCurrElement, setIsCurrElement] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsCurrElement(prev => !prev);
  };


  return (
    <ul className={className}>
      <li>
        <NavLink
          exact="true"
          to={`/${lang}/`}
          activeclassname="active"
        >
          {t('homeLink')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/${lang}/about`}
          activeclassname="active"
        >
          {t('aboutLink')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/${lang}/pages`}
          activeclassname="active"
          onClick={handleClick}
        >
          {t('pagesLink')}
          <span className={`arrow_down ${isCurrElement ? 'rotate' : ''}`}></span>
        </NavLink>
        {isCurrElement &&
          <NestedNavLinks setIsCurrElement={setIsCurrElement} t={t} />
        }
      </li>
      <li>
        <NavLink
          to={`/${lang}/courses`}
          activeclassname='active'
        >
          {t('coursesLink')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/${lang}/contact`}
          activeclassname='active'
        >
          {t('contactLink')}
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
