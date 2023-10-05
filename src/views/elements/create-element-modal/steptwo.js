import React from "react";
import s from "../elements.module.scss";
import Button from "../../../components/button";
import Switch from "../../../components/switch";
import RadioGroup from "../../../components/radiogroup";
import Input from "../../../components/input";

const StepTwo = ({ handlePrev, handleSubmit }) => {
  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="startdate">
          Effective Start Date
        </label>
        <Input id="startdate" type="date" />
      </div>
      <div>
        <label className={s.label} htmlFor="class">
          Effective End Date
        </label>
        <Input id="enddate" type="date" />
      </div>
      <div>
        <div className={s.label}>Processing Type</div>
        <RadioGroup name="type" options={["Open", "Closed"]} />
      </div>
      <div>
        <div className={s.label}>Pay Frequency</div>
        <RadioGroup name="freq" options={["Monthly", "Selected Months"]} />
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="paymonth">
          Selected Pay Month
        </label>
        <select id="paymonth"></select>
      </div>
      <div>
        <div className={s.label}>Prorate</div>
        <RadioGroup options={["No", "Yes"]} />
      </div>
      <div>
        <div className={s.label}>Status</div>
        <div>
          <Switch label="Active" />
        </div>
      </div>
      <Button size="large" fullWidth mode="outlined" onClick={handlePrev}>
        Back
      </Button>
      <Button size="large" fullWidth onClick={handleSubmit}>
        Create New Element
      </Button>
    </form>
  );
};

export default StepTwo;
