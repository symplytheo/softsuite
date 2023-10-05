import React from "react";
import RadioGroup from "../../../components/radiogroup";
import Switch from "../../../components/switch";
import Button from "../../../components/button";
import s from "../elementlink.module.scss";
import Input from "../../../components/input";

const AddLinkStepThree = ({ handlePrev, onClose }) => {
  return (
    <form className={s.form}>
        <div>
        <label className={s.label} htmlFor="job">
          Amount Type
        </label>
        <select id="job"></select>
      </div>
      <div>
        <label className={s.label} htmlFor="location">
          ...
        </label>
        <select id="location"></select>
      </div>
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
        <div className={s.label}>Automate</div>
        <RadioGroup options={["Yes", "No"]} />
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
      <Button size="large" fullWidth onClick={onClose}>
        Create A New Element Link
      </Button>
    </form>
  );
};

export default AddLinkStepThree;
