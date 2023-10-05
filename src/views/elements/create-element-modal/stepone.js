import React from "react";
import s from "../elements.module.scss";
import Button from "../../../components/button";

const StepOne = ({ handleNext, onClose }) => {
  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="name">Name</label>
        <input id="name" />
      </div>
      <div>
        <label className={s.label} htmlFor="class">Element Classification</label>
        <select id="class"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="category">Element Category</label>
        <select id="category"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="payrun">Payrun</label>
        <select id="payrun"></select>
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="desc">Description</label>
        <textarea id="desc" rows={3}></textarea>
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="report">Reporting Name</label>
        <textarea id="report" rows={2}></textarea>
      </div>
      <Button size="large" fullWidth mode="outlined" onClick={onClose}>
        Cancel
      </Button>
      <Button size="large" fullWidth onClick={handleNext}>
        Next
      </Button>
    </form>
  );
};

export default StepOne;
