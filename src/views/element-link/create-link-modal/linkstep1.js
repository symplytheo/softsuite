import React, { useEffect, useState } from "react";
import Button from "../../../components/button";
import s from "../elementlink.module.scss";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { useSelector } from "react-redux";
import { useGetDepartmentsQuery } from "../../../lib/api";

const AddLinkStepOne = ({ initialValue, handleNext, onClose }) => {
  const [form, setForm] = useState(initialValue);

  const { suborganizations, jobTitles, employeeCategories, locations, employeeTypes } = useSelector(
    (state) => state.root
  );

  const [departmentOptions, setDepartmentOptions] = useState([]);

  const { data: departments, isLoading } = useGetDepartmentsQuery(form.suborganizationId?.id);

  useEffect(() => {
    if (departments) {
      setDepartmentOptions(departments?.data || []);
    }
  }, [departments]);

  return (
    <form className={s.form}>
      <div className={s.colspan_2}>
        <label className={s.label} htmlFor="name">
          Element Link Name
        </label>
        <Input id="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
      </div>
      <div>
        <label className={s.label} htmlFor="sub">
          Suborganization
        </label>
        <Select
          id="sub"
          options={suborganizations}
          itemLabel="name"
          itemValue="id"
          value={form.suborganizationId}
          onChange={(v) => setForm({ ...form, suborganizationId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="dept">
          Department
        </label>
        <Select
          id="dept"
          options={departmentOptions}
          itemLabel="name"
          itemValue="id"
          loading={isLoading}
          value={form.departmentId}
          onChange={(v) => setForm({ ...form, departmentId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="job">
          Job Title
        </label>
        <Select
          id="job"
          options={jobTitles}
          itemLabel="name"
          itemValue="id"
          value={form.jobTitleId}
          onChange={(v) => setForm({ ...form, jobTitleId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="location">
          Location
        </label>
        <Select
          id="location"
          options={locations}
          itemLabel="name"
          itemValue="id"
          value={form.locationId}
          onChange={(v) => setForm({ ...form, locationId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="type">
          Employee Type
        </label>
        <Select
          id="type"
          options={employeeTypes}
          itemLabel="name"
          itemValue="id"
          value={form.employeeTypeValueId}
          onChange={(v) => setForm({ ...form, employeeTypeValueId: v })}
        />
      </div>
      <div>
        <label className={s.label} htmlFor="category">
          Employee Category
        </label>
        <Select
          id="category"
          options={employeeCategories}
          itemLabel="name"
          itemValue="id"
          value={form.employeeCategoryValueId}
          onChange={(v) => setForm({ ...form, employeeCategoryValueId: v })}
        />
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

export default AddLinkStepOne;
