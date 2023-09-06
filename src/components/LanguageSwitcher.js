import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDropdown from './Navbar/customDropdown/CustomDropDown';
import Loader from './Loader';
import { useCookies } from 'react-cookie';
import { AppContext } from '../contexts/AppContext';
import { useContext } from 'react';
import useDirectionChange from "../utils/useDirectionChange"

function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(['selectedLanguage'])


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
    setCookie('selectedLanguage', option.value); // Save selected language to local storage
    i18n.changeLanguage(option.value, () => setTimeout(() => setIsLoading(false), 500));
  };
  // get language value from local storage
  useEffect(() => {
    const selectedLanguage = cookies.selectedLanguage;
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [cookies, i18n]);
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