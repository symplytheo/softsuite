import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    elementCategories: [],
    elementClassifications: [],
    elementPayruns: [],
    suborganizations: [],
    locations: [],
    jobTitles: [],
    employeeTypes: [],
    unions: [],
    employeeCategories: [],
    grades: [],
  },
  reducers: {
    setElementCategories: (state, { payload }) => {
      state.elementCategories = payload;
    },
    setElementClassification: (state, { payload }) => {
      state.elementClassifications = payload;
    },
    setElementPayruns: (state, { payload }) => {
      state.elementPayruns = payload;
    },
    setSuborganizations: (state, { payload }) => {
      state.suborganizations = payload;
    },
    setEmployeeCategories: (state, { payload }) => {
      state.employeeCategories = payload;
    },
    setUnions: (state, { payload }) => {
      state.unions = payload;
    },
    setEmployeeTypes: (state, { payload }) => {
      state.employeeTypes = payload;
    },
    setJobTitles: (state, { payload }) => {
      state.jobTitles = payload;
    },
    setLocations: (state, { payload }) => {
      state.locations = payload;
    },
    setGrades: (state, { payload }) => {
      state.grades = payload;
    },
  },
});

export const {
  setElementCategories,
  setElementClassification,
  setElementPayruns,
  setSuborganizations,
  setEmployeeCategories,
  setEmployeeTypes,
  setJobTitles,
  setLocations,
  setUnions,
  setGrades,
} = rootSlice.actions;

export default rootSlice.reducer;
