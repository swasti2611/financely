import React from "react";
import "./styles.css";
const Input = ({ lable, state, setState,placeholder ,type}) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{lable}</p>
      <input
      type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
