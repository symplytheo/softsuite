import React from "react";
import s from "./chip.module.scss";

const Chip = ({ color, mode, children, className }) => {
  return <span className={[s.base, s[color], s[mode], className].join(" ")}>{children}</span>;
};

Chip.defaultProps = {
  mode: "tonal", // filled, outlined, tonal,
  color: "secondary", // primary, secondary, error
};

export default Chip;
