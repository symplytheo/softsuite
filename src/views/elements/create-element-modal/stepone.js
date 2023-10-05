import React from "react";
import s from "../elements.module.scss";
import Button from "../../../components/button";
import Input from "../../../components/input";
import TextArea from "../../../components/textarea";

const StepOne = ({ handleNext, onClose }) => {
  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="name">Name</label>
        <Input id="name" />
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
        <TextArea id="desc" rows={3} />
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="report">Reporting Name</label>
        <TextArea id="report" />
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
