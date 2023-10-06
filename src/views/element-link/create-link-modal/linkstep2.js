import React, { useEffect, useState } from "react";
import s from "../elementlink.module.scss";
import Button from "../../../components/button";
import TextArea from "../../../components/textarea";
import Select from "../../../components/select";
import { useSelector } from "react-redux";
import { useGetGradeStepsQuery } from "../../../lib/api";

const AddLinkStepTwo = ({ initialValue, handlePrev, handleNext }) => {
  const [form, setForm] = useState(initialValue);

  const [gradeStepOptions, setGradeStepOptions] = useState([]);

  const { unions, grades } = useSelector((state) => state.root);

  const { data: gradeSteps } = useGetGradeStepsQuery(form.grade?.id);

  useEffect(() => {
    if (gradeSteps) {
      setGradeStepOptions(gradeSteps.data || []);
    }
  }, [gradeSteps]);

  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="grade">
          Grade
        </label>
        <Select
          id="grade"
          options={grades}
          itemLabel="name"
          itemValue="id"
          value={form.grade}
          onChange={(v) => setForm({ ...form, grade: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="step">
          Grade Step
        </label>
        <Select
          id="step"
          options={gradeStepOptions}
          itemLabel="name"
          itemValue="id"
          value={form.gradeStep}
          onChange={(v) => setForm({ ...form, gradeStep: v })}
        />
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="union">
          Union
        </label>
        <Select
          id="union"
          options={unions}
          itemLabel="name"
          itemValue="id"
          value={form.unionId}
          onChange={(v) => setForm({ ...form, unionId: v })}
        />
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="additional">
          Additional Assignment Information
        </label>
        <TextArea
          id="additional"
          value={form.additionalInfo}
          onChange={(v) => setForm({ ...form, additionalInfo: v })}
        />
      </div>

      <Button size="large" fullWidth mode="outlined" onClick={() => handlePrev(form)}>
        Back
      </Button>
      <Button size="large" fullWidth onClick={() => handleNext(form)}>
        Next
      </Button>
    </form>
  );
};

export default AddLinkStepTwo;
