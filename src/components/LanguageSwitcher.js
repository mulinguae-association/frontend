import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDropdown from './Navbar/customDropdown/CustomDropDown';
import Loader from './Loader';
import { useCookies } from 'react-cookie';
import { AppContext } from '../contexts/AppContext';
import { useContext } from 'react';
import useDirectionChange from "../utils/useDirectionChange"
import { useNavigate, useLocation } from 'react-router-dom';

function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(['selectedLanguage'])
  const navigate = useNavigate();
  const location = useLocation()

  const options = [
    { label: 'Arabic', value: 'Ar' },
    { label: 'English', value: 'En' },
    { label: 'French', value: 'Fr' },
    { label: 'Hindi', value: 'Hi' },
    { label: 'Kreol Morisyen', value: 'KM' },
    { label: 'Mandarin', value: 'Mn' },
    { label: 'portuguese', value: 'Pt' },
    { label: 'Quechua', value: 'Qu' },
    { label: 'Russian', value: 'Ru' },
    { label: 'Spanish', value: 'Es' },
    { label: 'Urdu', value: 'Ur' },

  ];
  const handleSelect = (option) => {
    setIsLoading(true)
    setCookie('selectedLanguage', option.value); // Save selected language to cookies
    i18n.changeLanguage(option.value, () => setTimeout(() => setIsLoading(false), 400));
    const currPath = window.location.pathname.split("/").slice(2).join("/");
    navigate(`/${option.value}/${currPath}`);
  };
  // Function to map URL language to option value
  const mapUrlLanguageToOptionValue = (urlLanguage) => {
    return options.find((option) => option.value.toLowerCase() === urlLanguage.toLowerCase());
  };

  useEffect(() => {
    const urlLanguage = location.pathname.split("/")[1];
    const selectedOption = mapUrlLanguageToOptionValue(urlLanguage);
    if (selectedOption) {
      handleSelect(selectedOption);
    }
  }, []);

  useDirectionChange(i18n.language)
  return (
    <>
      {isLoading && <Loader />}
      <CustomDropdown
        className={className}
        cookies={cookies}
        options={options}
        onSelect={handleSelect} />
    </>
  );
}

export default LanguageSwitcher;