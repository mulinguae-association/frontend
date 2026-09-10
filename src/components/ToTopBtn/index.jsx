import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import "./ToTop_Btn.scss"

const ToTopBtn = () => {
  const { t } = useTranslation('global');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button
      aria-label={t("app.backToTop")}
      name='toTopBtn'
      className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <span className="arrow-top"></span>
      <span className="arrow-top"></span>
    </button>
  )
}

export default ToTopBtn