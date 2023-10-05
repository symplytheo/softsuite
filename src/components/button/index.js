import React from "react";
import s from "./button.module.scss";

Button.defaultProps = {
  type: "button",
  size: "medium", // large, medium
  color: "secondary", // primary, secondary, error
  mode: "filled", // outlined
};

function Button({ type, size, mode, color, fullWidth, onClick, loading, loadingText, className, children }) {
  return (
    <button
      type={type}
      size={size}
      disabled={loading}
      className={[s.base, s[mode], s[size], s[color], fullWidth && s.fullwidth, className].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      {loadingText || children}
    </button>
  );
}

export default Button;
