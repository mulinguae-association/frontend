import React from "react";
import { useReactToPrint } from "react-to-print";
import "./PrintBtn.scss";
const PrintBtn = ({ componentRef, print }) => {
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div className='print_container'>
			<button
				className='print_btn'
				aria-label='rint this article'
				onClick={handlePrint}>
				<span>{print}</span>
				<img
					src={"/images/icons/print.svg"}
					width='25px'
					height='25px'
					alt='printImg'
				/>
			</button>
		</div>
	);
};

export default PrintBtn;
