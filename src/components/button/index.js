import React from "react";
import s from "./button.module.scss";

Button.defaultProps = {
  type: "button",
  size: "medium",
  color: "secondary", // primary, secondary, error
};

function Button({ type, size, color, onClick, className, children }) {
  return (
    <button
      type={type}
      size={size}
      className={[s.base, s[`${size}`], s[`${color}`], className].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
