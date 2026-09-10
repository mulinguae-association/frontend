import React from "react";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import "./PrintBtn.scss";
const PrintBtn = ({ componentRef, print }) => {
	const { t } = useTranslation('global');
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div className='print_container'>
			<button
				className='print_btn'
				aria-label={t("app.printArticle")}
				onClick={handlePrint}>
				<span>{print}</span>
				<img
					src={"/images/icons/print.svg"}
					width='25px'
					height='25px'
					alt={t("app.altPrintImg")}
				/>
			</button>
		</div>
	);
};

export default PrintBtn;
