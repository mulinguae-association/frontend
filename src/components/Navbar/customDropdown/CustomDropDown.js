import React, { useEffect, useRef, useState } from "react";
import "./CustomDropdown.scss";

const CustomDropdown = ({ options, onSelect, className }) => {
	const [selectedOption, setSelectedOption] = useState(options[1]);
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
		const selectedLanguage = localStorage.getItem("selectedLanguage");
		const option = options.find((o) => o.value === selectedLanguage);
		setSelectedOption(option);

	}, [options]);

	return (
		<div className={className} ref={dropdownRef}>
			<div className='selected-option' onClick={() => setIsOpen(!isOpen)}>
				{selectedOption ?
					<span className="theLang">{selectedOption?.value}</span> :
					<span className="theLang">En</span>
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
				<ul
					style={["Ar", "Ur"].includes(selectedOption?.value) ? { left: 0, right: "auto" } : {}}
					className='options thin-scroll'
				>
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
