import React from "react";
import "../Dashboard/Dashboard.scss";
const InputField = ({
	label,
	type,
	placeholder,
	value,
	onChange,
	className,
	name,
	onClick,
	required = false,
}) => (
	<div className='input_field'>
		<label className='visually-hidden' aria-hidden='true'>
			{label}
		</label>
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={className}
			onClick={onClick}
			required={required}
		/>
	</div>
);
export default InputField;
