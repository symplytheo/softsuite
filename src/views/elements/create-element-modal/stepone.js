import React, { useState } from "react";
import s from "../elements.module.scss";
import Button from "../../../components/button";
import Input from "../../../components/input";
import TextArea from "../../../components/textarea";
import Select from "../../../components/select";
import { useSelector } from "react-redux";

const StepOne = ({ initialValue, handleNext, onClose }) => {
  // get classifications, categories & payruns from store
  const { elementCategories, elementClassifications, elementPayruns } = useSelector((state) => state.root);

  const [form, setForm] = useState(initialValue);

  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="name">
          Name
        </label>
        <Input id="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
      </div>
      <div>
        <label className={s.label} htmlFor="class">
          Element Classification
        </label>
        <Select
          id="class"
          options={elementClassifications}
          itemLabel="name"
          itemValue="id"
          value={form.classificationValueId}
          onChange={(v) => setForm({ ...form, classificationValueId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="category">
          Element Category
        </label>
        <Select
          id="category"
          options={elementCategories}
          itemLabel="name"
          itemValue="id"
          value={form.categoryValueId}
          onChange={(v) => setForm({ ...form, categoryValueId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="payrun">
          Payrun
        </label>
        <Select
          id="payrun"
          options={elementPayruns}
          itemLabel="name"
          itemValue="id"
          value={form.payRunValueId}
          onChange={(v) => setForm({ ...form, payRunValueId: v })}
        />
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="desc">
          Description
        </label>
        <TextArea id="desc" rows={3} value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
      </div>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="report">
          Reporting Name
        </label>
        <TextArea id="report" value={form.reportingName} onChange={(v) => setForm({ ...form, reportingName: v })} />
      </div>
      <Button size="large" fullWidth mode="outlined" onClick={onClose}>
        Cancel
      </Button>
      <Button size="large" fullWidth onClick={() => handleNext(form)}>
        Next
      </Button>
    </form>
  );
};

export default StepOne;
