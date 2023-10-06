import React, { useState } from "react";
import ReactSelect from "react-select";
import "./select.scss";

const Select = ({ id, error, hint, loading, itemLabel, itemValue, value, multiple, options = [], onChange = () => {} }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (val) => {
    setSelected(val);
    onChange(val);
  };

  const OPTIONS = options.map((option) => {
    if (typeof option === "object") return { ...option, label: option[itemLabel], value: option[itemValue] };
    else return { label: option, value: option };
  });

  return (
    <div className={`container ${error ? "error" : ""}`}>
      <ReactSelect
        inputId={id}
        options={OPTIONS}
        className={"customSelect"}
        classNamePrefix={"customSelect"}
        isMulti={multiple}
        isLoading={loading}
        value={selected}
        defaultValue={value}
        onChange={handleChange}
      />
      {error && <div className={"errormessage"}>{error}</div>}
      {!error && hint && <div className={"hint"}>{hint}</div>}
    </div>
  );
};

export default Select;
