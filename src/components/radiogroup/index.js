import React, { useState } from "react";
import s from "./radiogroup.module.scss";

const RadioGroup = ({ options, orientation, value, onChange = () => {}, name = "radio-group" }) => {
  const [selected, setSelected] = useState(value);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={[s.group, s[orientation]].join(" ")}>
      {options.map((option, index) => (
        <label key={index} className={s.label}>
          <input type="radio" name={name} value={option} checked={selected === option} onChange={handleSelect} />
          <span className={s.button}></span>
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
