import React from "react";
import s from "../elementlink.module.scss";
import Button from "../../../components/button";
import TextArea from "../../../components/textarea";

const AddLinkStepTwo = ({ handlePrev, handleNext }) => {
  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="grade">
          Grade
        </label>
        <select id="grade"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="step">
          Grade Step
        </label>
        <select id="step"></select>
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="union">
          Union
        </label>
        <select id="union"></select>
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="additional">
          Additional Assignment Information 
        </label>
        <TextArea id="additional" />
      </div>

      <Button size="large" fullWidth mode="outlined" onClick={handlePrev}>
        Back
      </Button>
      <Button size="large" fullWidth onClick={handleNext}>
        Next
      </Button>
    </form>
  );
};

export default AddLinkStepTwo;
