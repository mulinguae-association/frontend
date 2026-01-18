import React, { useEffect, useRef, useState } from "react";
import "./CustomDropdown.scss";

const CustomDropdown = ({ options, onSelect, className }) => {
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("i18nextLng") || options[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleOptionClick = (option) => {
    setSelectedLang(option.value);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={className} ref={dropdownRef}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedLang ? (
          <span className="theLang">{selectedLang}</span>
        ) : (
          <span className="theLang">En</span>
        )}
        <div>
          <img
            className="languages_icon"
            src={"/images/icons/languages-icon.png"}
            alt="languagesIcon"
          />
          <span className={`arrow_down ${isOpen ? "rotate" : ""}`}></span>
        </div>
      </div>
      {isOpen && (
        <ul
          style={
            ["ar", "ur"].includes(selectedLang)
              ? { left: 0, right: "auto" }
              : {}
          }
          className="options thin-scroll"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={
                option.value === selectedLang.toLowerCase() ? "selected" : ""
              }
            >
              <span className="option">
                {option.label}
                {selectedLang.toLowerCase() === option?.value && (
                  <img src={"/images/icons/right-icon.png"} alt="right-icon" />
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomDropdown;
