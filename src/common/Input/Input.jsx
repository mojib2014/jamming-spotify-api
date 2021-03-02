import React from "react";
import "./input.css";

export default function Input({
  name,
  placeholder,
  type,
  label,
  error,
  onChange,
  ...rest
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
