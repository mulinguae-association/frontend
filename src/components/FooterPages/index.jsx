import React from "react";
import "./footer.scss";
import TopFooter from "./TopFooter";
import BottomFooter from "./BottomFooter";
const Footer = ({ footerRef }) => {
	return (
		<footer ref={footerRef} className='footer change_direction'>
			<TopFooter />
			<BottomFooter />
		</footer>
	);
};

export default Footer;
