import React from "react";
import s from "./textarea.module.scss";

const TextArea = ({ error, hint, ...rest }) => {
  return (
    <div className={s.container}>
      <textarea className={`${s.input} ${error ? s.error : ""}`} {...rest} />
      {error && <div className={s.errormessage}>{error}</div>}
      {!error && hint && <div className={s.hint}>{hint}</div>}
    </div>
  );
};

export default TextArea;
