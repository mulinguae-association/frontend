import React, { useState, useRef, useEffect } from "react";
import "./CustomDropdown.scss";

const CustomDropdown = ({
  options = [],
  value,
  onChange,
  className = "",
  style = {},
  dropdownStyle = {},
  ...props
}) => {
  const [open, setOpen] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div
      className={`custom-dropdown-wrapper ${className}`.trim()}
      style={style}
      ref={ref}
      tabIndex={0}
      onBlur={() => setOpen(false)}
      {...props}
    >
      <div
        className={`custom-dropdown-selected${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        style={dropdownStyle}
      >
        {selected ? selected.label : "Select..."}
        <span className="custom-dropdown-arrow" />
      </div>
      {open && (
        <ul className="custom-dropdown-list">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-dropdown-option${opt.value === value ? " selected" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
