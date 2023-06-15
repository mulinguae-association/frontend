import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDropdown from './Navbar/customDropdown/CustomDropDown';
import useDirectionChange from './useDirectionChange';

function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  useDirectionChange(i18n.language)
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { label: 'English', value: 'En' },
    { label: 'Spanish', value: 'Es' },
    { label: 'French', value: 'Fr' },
    { label: 'portuguese', value: 'Pt' },
    { label: 'Arabic', value: 'Ar' },
    { label: 'Quechua', value: 'Qu' },
    { label: 'Kreol Morisyen', value: 'KM' },
  ];
  const handleSelect = (option) => {
    setIsLoading(true)
    localStorage.setItem('selectedLanguage', option.value); // Save selected language to local storage
    i18n.changeLanguage(option.value, () => setTimeout(() => setIsLoading(false), 1000));
  };
  // get language value from local storage
  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]);

  return (
    <>
      {isLoading && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>Loading...</div>}
      <CustomDropdown className={className} options={options} onSelect={handleSelect} />

    </>
  );
}

export default LanguageSwitcher;