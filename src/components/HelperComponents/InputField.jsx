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
  id,
  onClick,
  required = false,
  autoComplete = "on",
}) => (
  <div className="input_field">
    <label htmlFor={name} className="visually-hidden" aria-hidden="true">
      {label}
    </label>
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      onClick={onClick}
      required={required}
      autoComplete={autoComplete}
    />
  </div>
);
export default InputField;
