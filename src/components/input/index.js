import React from "react";
import s from "./input.module.scss";

const Input = ({ error, hint, ...rest }) => {
  return (
    <div className={s.container}>
      <input className={`${s.input} ${error ? s.error : ""}`} {...rest} />
      {error && <div className={s.errormessage}>{error}</div>}
      {!error && hint && <div className={s.hint}>{hint}</div>}
    </div>
  );
};

export default Input;
