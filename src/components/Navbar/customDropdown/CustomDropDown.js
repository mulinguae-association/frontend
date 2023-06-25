import React, { useEffect, useRef, useState } from 'react';
import './CustomDropdown.scss';

const CustomDropdown = ({ options, onSelect, className }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
    // Save selected language to local storage
    localStorage.setItem('selectedLanguage', option.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // change direction if the language was arabic
  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      const option = options.find((o) => o.value === selectedLanguage);
      setSelectedOption(option);
    }
  }, [options]);

  return (
    <div className={className} ref={dropdownRef}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? `${selectedOption?.value === "Ar" ? "اللغات" : "languages"} (${selectedOption?.value})` : `languages (En) `}
        <img className='languages_icon' src={process.env.PUBLIC_URL + '/images/icons/languages-icon.png'} alt='languagesIcon' />
      </div>
      {isOpen && (
        <ul className="options thin-scroll">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={option === selectedOption ? 'selected' : ''}
            >
              <span className='option'>
                {option.label}

                {selectedOption?.value === option?.value &&
                  <img src={process.env.PUBLIC_URL + "/images/icons/right-icon.png"} alt="right-icon" />
                }
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomDropdown;
