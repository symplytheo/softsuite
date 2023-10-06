import React, { useState } from "react";
import s from "../elements.module.scss";
import Button from "../../../components/button";
import Switch from "../../../components/switch";
import RadioGroup from "../../../components/radiogroup";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { MONTHS } from "../../../assets/utils";
import { useCreateElementMutation } from "../../../lib/api";

const StepTwo = ({ handlePrev, handleSubmit, initialValue }) => {
  const [form, setForm] = useState(initialValue);

  const [createElement, { error, isLoading }] = useCreateElementMutation();

  const handleCreate = async () => {
    const payload = {
      ...form,
      payRunId: +form.payRunValueId.lookupId,
      payRunValueId: +form.payRunValueId.id,
      categoryId: +form.categoryValueId.lookupId,
      categoryValueId: +form.categoryValueId.id,
      classificationId: +form.classificationValueId.lookupId,
      classificationValueId: +form.classificationValueId.id,
      selectedMonths: form.payFrequency === "Monthly" ? [] : form.selectedMonths.map((x) => x.value),
      status: form.status ? "Active" : "Inactive",
    };
    await createElement(payload);
    if (error) return alert("Error ==> " + error);
    handleSubmit();
  };

  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="startdate">
          Effective Start Date
        </label>
        <Input
          id="startdate"
          type="date"
          value={form.effectiveStartDate}
          onChange={(v) => setForm({ ...form, effectiveStartDate: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="class">
          Effective End Date
        </label>
        <Input
          id="enddate"
          type="date"
          value={form.effectiveEndDate}
          onChange={(v) => setForm({ ...form, effectiveEndDate: v })}
        />
      </div>
      <div>
        <div className={s.label}>Processing Type</div>
        <RadioGroup
          name="type"
          options={["Open", "Closed"]}
          value={form.processingType}
          onChange={(v) => setForm({ ...form, processingType: v })}
        />
      </div>
      <div>
        <div className={s.label}>Pay Frequency</div>
        <RadioGroup
          name="freq"
          options={["Monthly", "Selected Months"]}
          value={form.payFrequency}
          onChange={(v) => setForm({ ...form, payFrequency: v })}
        />
      </div>
      {form.payFrequency === "Selected Months" && (
        <div className={s.colspan_2}>
          <label className={s.label} htmlFor="paymonth">
            Selected Pay Month
          </label>
          <Select
            id="paymonth"
            options={MONTHS}
            multiple
            value={form.selectedMonths}
            onChange={(v) => setForm({ ...form, selectedMonths: v })}
          />
        </div>
      )}
      <div>
        <div className={s.label}>Prorate</div>
        <RadioGroup options={["No", "Yes"]} value={form.prorate} onChange={(v) => setForm({ ...form, prorate: v })} />
      </div>
      <div>
        <div className={s.label}>Status</div>
        <div>
          <Switch label="Active" value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
        </div>
      </div>
      <Button size="large" fullWidth mode="outlined" onClick={handlePrev}>
        Back
      </Button>
      <Button size="large" loading={isLoading} loadingText={"Creating..."} fullWidth onClick={handleCreate}>
        Create New Element
      </Button>
    </form>
  );
};

export default StepTwo;
