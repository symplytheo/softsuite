import React from "react";
import Button from "../../../components/button";
import s from "../elementlink.module.scss";
import Input from "../../../components/input";

const AddLinkStepOne = ({ handleNext, onClose }) => {
  return (
    <form className={s.form}>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="name">
          Element Link Name
        </label>
        <Input id="name" error={"This field is required"} />
      </div>
      <div>
        <label className={s.label} htmlFor="sub">
          Suborganization
        </label>
        <select id="sub"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="dept">
          Department
        </label>
        <select id="dept"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="job">
          Job Title
        </label>
        <select id="job"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="location">
          Location
        </label>
        <select id="location"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="type">
          Employee Type
        </label>
        <select id="type"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="category">
          Employee Category
        </label>
        <select id="category"></select>
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

export default AddLinkStepOne;
