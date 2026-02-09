import React from "react";
import "./Input.scss";

const Input = ({ label, value, onChange, type = "text", ...props }) => (
  <div className="input-group">
    {label && <label>{label}</label>}
    <input value={value} onChange={onChange} type={type} {...props} />
  </div>
);

export default Input;
