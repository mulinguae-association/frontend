import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (e) => {
    setIsLoading(true)
    i18n.changeLanguage(e.target.value, () => setTimeout(() => setIsLoading(false), 1000));
  };

  return (
    <>
      {isLoading && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>Loading...</div>}
      <select className="language-select" onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="ch">Chinese</option>
        <option value="pr">portuguese</option>
      </select>
    </>
  );
}

export default LanguageSwitcher;