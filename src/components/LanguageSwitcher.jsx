import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDropdown from './Navbar/customDropdown/CustomDropDown';
import useDirectionChange from "../utils/useDirectionChange";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const options = useMemo(() => [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' },
    { label: 'French', value: 'fr' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Kreol Morisyen', value: 'km' },
    { label: 'Mandarin', value: 'mn' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Quechua', value: 'qu' },
    { label: 'Russian', value: 'ru' },
    { label: 'Spanish', value: 'es' },
    { label: 'Urdu', value: 'ur' }
  ], []);

  const handleSelect = (option) => {
    const newPathname = location.pathname.replace(`/${lng}`, `/${option.value}`)
    navigate(newPathname, { replace: true });
    i18n.changeLanguage(option.value);
  };

  useDirectionChange(i18n.language);

  return (
    <>
      <CustomDropdown
        className={className}
        options={options}
        onSelect={handleSelect}
      />
    </>
  );
}

export default LanguageSwitcher;
