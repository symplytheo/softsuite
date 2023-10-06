import React, { useState } from "react";
import RadioGroup from "../../../components/radiogroup";
import Switch from "../../../components/switch";
import Button from "../../../components/button";
import s from "../elementlink.module.scss";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { useCreateElementLinkMutation } from "../../../lib/api";

const AddLinkStepThree = ({ initialValue, handlePrev, handleSubmit }) => {
  const [form, setForm] = useState(initialValue);

  const [createElementLink, { isLoading }] = useCreateElementLinkMutation();

  const handleCreate = () => {
    const payload = {
      ...form,
      elementId: +form.elementId,
      amount: +form.amount,
      suborganizationId: +form.suborganizationId.id,
      locationId: +form.locationId.id,
      departmentId: +form.departmentId.id,
      jobTitleId: +form.jobTitleId.id,
      grade: +form.grade.id,
      gradeStep: +form.gradeStep.id,
      unionId: +form.unionId.id,
      amountType: form.amountType.value,
      employeeTypeId: +form.employeeTypeValueId.lookupId,
      employeeTypeValueId: +form.employeeTypeValueId.id,
      employeeCategoryId: +form.employeeCategoryValueId.lookupId,
      employeeCategoryValueId: +form.employeeCategoryValueId.id,
      status: form.status ? "Active" : "Inactive",
    };
    console.log(payload);

    createElementLink({id: payload.elementId, payload})
      .unwrap()
      .then(() => {
        handleSubmit();
      })
      .catch((error) => console.error("rejected", error));
  };

  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="type">
          Amount Type
        </label>
        <Select
          id="type"
          options={["Fixed Value", "Negotiable"]}
          value={form.amountType}
          onChange={(v) => setForm({ ...form, amountType: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="amount">
          Amount
        </label>
        <Input id="amount" type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} />
      </div>
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
        <div className={s.label}>Automate</div>
        <RadioGroup options={["Yes", "No"]} value={form.automate} onChange={(v) => setForm({ ...form, automate: v })} />
      </div>
      <div>
        <div className={s.label}>Status</div>
        <div>
          <Switch label="Active" value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
        </div>
      </div>
      <Button size="large" fullWidth mode="outlined" onClick={() => handlePrev(form)}>
        Back
      </Button>
      <Button size="large" fullWidth loading={isLoading} loadingText={"Creating..."} onClick={handleCreate}>
        Create A New Element Link
      </Button>
    </form>
  );
};

export default AddLinkStepThree;
