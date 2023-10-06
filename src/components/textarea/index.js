import React, { useState } from "react";
import s from "./textarea.module.scss";

const TextArea = ({ error, hint, value, onChange = () => {}, ...rest }) => {
  const [text, setText] = useState(value);
  const handleChange = (val) => {
    setText(val);
    onChange(val);
  };

  return (
    <div className={s.container}>
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className={`${s.input} ${error ? s.error : ""}`}
        {...rest}
      />
      {error && <div className={s.errormessage}>{error}</div>}
      {!error && hint && <div className={s.hint}>{hint}</div>}
    </div>
  );
};

export default TextArea;
