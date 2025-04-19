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
    const isRTL = ["ar", "ur"].includes(i18n.language);

    return (
      <div
        className={`input_field ${
          isRTL ? "rtl-placeholder" : "ltr-placeholder"
        } ${className || ""}`}
      >
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
          dir={isRTL ? "rtl" : "ltr"}
          {...props}
        />
      </div>
    );
  },
);

export default TextArea;
