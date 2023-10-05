import React, { useState } from "react";
import s from "./switch.module.scss";

const Switch = ({ label, value, onChange = () => {} }) => {
  const [isChecked, setIsChecked] = useState(value || false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className={s.container}>
      <label className={s.switch}>
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className={s.slider}></span>
      </label>
      {label}
    </div>
  );
};

export default Switch;
