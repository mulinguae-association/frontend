import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import "./TextArea.scss";

const TextArea = forwardRef(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      className,
      name,
      id,
      rows = 4,
      required = false,
      hideLabel = false,
      ...props
    },
    ref,
  ) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === "ar";

    return (
      <div className={`input_field ${className || ""}`}>
        <label
          htmlFor={id}
          className={hideLabel && "visually-hidden"}
          aria-hidden={hideLabel && "true"}
        >
          {label}
        </label>

        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          ref={ref}
          dir={isAr ? "rtl" : "ltr"}
          {...props}
        />
      </div>
    );
  },
);

export default TextArea;
