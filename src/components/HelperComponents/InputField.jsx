import React from "react";
import { useTranslation } from "react-i18next";
import "./InputField.scss";

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
}) => {
  const { i18n } = useTranslation();
  const isRTL = ["ar", "ur"].includes(i18n.language);

  return (
    <div
      className={`input_field ${isRTL ? "rtl-placeholder" : "ltr-placeholder"}`}
    >
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
        dir={isRTL ? "rtl" : "ltr"}
        {...props}
      />
    </div>
  );
};

export default InputField;
