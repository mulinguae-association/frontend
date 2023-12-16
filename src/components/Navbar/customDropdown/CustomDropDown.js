import React, { useEffect, useRef, useState } from "react";
import "./CustomDropdown.scss";

const CustomDropdown = ({ options, onSelect, className, cookies }) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const handleOptionClick = (option) => {
		setSelectedOption(option);
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
	// change direction if the language was arabic
	useEffect(() => {
		if (cookies.selectedLanguage) {
			const option = options.find((o) => o.value === cookies.selectedLanguage);
			setSelectedOption(option);
		}
	}, [cookies, options]);

	return (
		<div className={className} ref={dropdownRef}>
			<div className='selected-option' onClick={() => setIsOpen(!isOpen)}>
				{/* {selectedOption
					? `${selectedOption?.value === "Ar" ? "اللغات" : "languages"} (${
							selectedOption?.value
					  })`
					: `languages (En) `} */}
				{/* ? `${selectedOption?.value === "Ar" ? "اللغات" : "languages"} (${ */}
				{/* selectedOption?.value */}
				{/* })` */}
				{/* :  */}
				{selectedOption ?
					<span style={selectedOption?.value === "Ar" ? { left: "-10px", right: "auto" } : {}} className="theLang">{selectedOption?.value}</span> :
					<span style={selectedOption?.value === "Ar" ? { left: "-10px", right: "auto" } : {}} className="theLang">En</span>
				}
				<div>
					<img
						className='languages_icon'
						src={"/images/icons/languages-icon.png"}
						alt='languagesIcon'
					/>
					<span className={`arrow_down ${isOpen ? "rotate" : ""}`}></span>
				</div>
			</div>
			{isOpen && (
				<ul style={selectedOption?.value === "Ar" ? { left: 0, right: "auto" } : {}} className='options thin-scroll'>
					{options.map((option) => (
						<li
							key={option.value}
							onClick={() => handleOptionClick(option)}
							className={option === selectedOption ? "selected" : ""}>
							<span className='option'>
								{option.label}

								{selectedOption?.value === option?.value && (
									<img src={"/images/icons/right-icon.png"} alt='right-icon' />
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
