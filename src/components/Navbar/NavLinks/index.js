import React, { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
const NestedNavLinks = React.lazy(() => import('./NestedNavLinks'));

const NavLinks = ({ className }) => {
  const { t } = useTranslation('home', { ns: 'home' });
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
          to={`.`}
          end
          activeclassname="active"
        >
          {t('homeLink')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`about`}
          activeclassname="active"
        >
          {t('aboutLink')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`pages`}
          activeclassname="active"
          onClick={handleClick}
        >
          {t('pagesLink')}
          <span className={`arrow_down ${isCurrElement ? 'rotate' : ''}`}></span>
        </NavLink>
        {isCurrElement &&
          <Suspense fallback={<div className="spin-loader"><BiLoaderAlt color='#fff' /></div>}>
            <NestedNavLinks setIsCurrElement={setIsCurrElement} t={t} />
          </Suspense>
        }
      </li>
      <li>
        <NavLink
          to={`courses`}
          activeclassname='active'
        >
          {t('coursesLink')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`contact`}
          activeclassname='active'
        >
          {t('contactLink')}
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
