import React, { useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDropdown from './Navbar/customDropdown/CustomDropDown';
import { useCookies } from 'react-cookie';
import useDirectionChange from "../utils/useDirectionChange"
import { useNavigate, useLocation } from 'react-router-dom';

function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const [cookies, setCookie] = useCookies(['selectedLanguage']);
  const navigate = useNavigate();
  const location = useLocation();

  const options = useMemo(() => [
    { label: 'English', value: 'En' },
    { label: 'Arabic', value: 'Ar' },
    { label: 'French', value: 'Fr' },
    { label: 'Hindi', value: 'Hi' },
    { label: 'Kreol Morisyen', value: 'KM' },
    { label: 'Mandarin', value: 'Mn' },
    { label: 'portuguese', value: 'Pt' },
    { label: 'Quechua', value: 'Qu' },
    { label: 'Russian', value: 'Ru' },
    { label: 'Spanish', value: 'Es' },
    { label: 'Urdu', value: 'Ur' },
  ], []);

  const handleSelect = useCallback((option) => {
    setCookie('selectedLanguage', option.value, { path: '/' }); // Save selected language to cookies
    const currPath = window.location.pathname.split("/").slice(2).join("/");
    navigate(`/${option.value}/${currPath}`);
    i18n.changeLanguage(option.value);
  }, [i18n, navigate, setCookie]);

  const mapUrlLanguageToOptionValue = useCallback((urlLanguage) => {
    return options.find((option) => option.value.toLowerCase() === urlLanguage.toLowerCase());
  }, [options]);

  useEffect(() => {
    const urlLanguage = location.pathname.split("/")[1];
    const selectedOption = mapUrlLanguageToOptionValue(urlLanguage);
    if (selectedOption) {
      handleSelect(selectedOption);
    }
  }, [location.pathname, handleSelect, mapUrlLanguageToOptionValue]);

  useDirectionChange(i18n.language);

  return (
    <>
      <CustomDropdown
        className={className}
        cookies={cookies}
        options={options}
        onSelect={handleSelect}
      />
    </>
  );
}

export default LanguageSwitcher;
