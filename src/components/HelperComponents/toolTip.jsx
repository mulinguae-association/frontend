import React, { useState } from "react";
import "./Tooltip.scss"; // Import the SCSS file for styling

const Tooltip = ({ text }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const toggleTooltip = () => {
		setShowTooltip(!showTooltip);
	};

	return (
		<div className='tooltip-container'>
			<div
				className='tooltip-icon'
				onMouseEnter={toggleTooltip}
				onMouseLeave={toggleTooltip}>
				<img
					width={20}
					height={20}
					src='/images/icons/toolTip.png'
					alt='Info'
				/>
			</div>
			{showTooltip && <div className='tooltip-text'>{text}</div>}
		</div>
	);
};

export default Tooltip;
