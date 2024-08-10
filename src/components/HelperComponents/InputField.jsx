import React from "react";
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
  searchQuery,
  ...props
}) => (
  <div className="input_field">
    <label htmlFor={id} className="visually-hidden" aria-hidden="true">
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
      ref={searchQuery}
      {...props}
    />
  </div>
);

export default InputField;
