import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE }),
  endpoints: (builder) => ({
    // Create element endpoint
    createElement: builder.mutation({
      query: (payload) => ({
        url: "/elements",
        method: "POST",
        body: payload,
      }),
    }),

    // Get all elements endpoint
    getAllElements: builder.query({
      query: () => "/elements",
    }),

    // Get element by id endpoint
    getElementById: builder.query({
      query: (id) => `/elements/${id}`,
    }),

    // Update element endpoint
    updateElement: builder.mutation({
      query: ({ id, item }) => ({
        url: `/elements/${id}`,
        method: "PUT",
        body: item,
      }),
    }),

    // Delete element endpoint
    deleteElement: builder.mutation({
      query: (id) => ({
        url: `/elements/${id}`,
        method: "DELETE",
      }),
    }),

    // Create element link endpoint
    createElementLink: builder.mutation({
      query: ({ id, payload }) => ({
        url: `elements/${id}/elementlinks`,
        method: "POST",
        body: payload,
      }),
    }),

    // Get all element links endpoint
    getAllElementLinks: builder.query({
      query: (id) => `elements/${id}/elementlinks`,
    }),

    // Get element by id endpoint
    getElementLinkById: builder.query({
      query: ({ id, linkId }) => `elements/${id}/elementlinks/${linkId}`,
    }),

    // Update element endpoint
    updateElementLink: builder.mutation({
      query: ({ id, linkId, item }) => ({
        url: `elements/${id}/elementlinks/${linkId}`,
        method: "PUT",
        body: item,
      }),
    }),

    // Delete element endpoint
    deleteElementLink: builder.mutation({
      query: ({ id, linkId }) => ({
        url: `elements/${id}/elementlinks/${linkId}`,
        method: "DELETE",
      }),
    }),

    // get Element Categories
    getElementCategories: builder.query({
      query: () => "/lookups/1/lookupvalues",
    }),

    // get Element Classifications
    getElementClassifications: builder.query({
      query: () => "/lookups/2/lookupvalues",
    }),

    // get Element Payruns
    getElementPayruns: builder.query({
      query: () => "/lookups/5/lookupvalues",
    }),

    // get suborganizations
    getSuborganizations: builder.query({
      query: () => "/suborganizations",
    }),

    // get departments
    getDepartments: builder.query({
      query: (id) => `/suborganizations/${id}/departments`,
    }),

    // get Employee Types
    getEmployeeTypes: builder.query({
      query: () => "/lookups/4/lookupvalues",
    }),

    // get Unions
    getUnions: builder.query({
      query: () => "/lookups/8/lookupvalues",
    }),

    // get job titles
    getJobTitles: builder.query({
      query: () => "/lookups/6/lookupvalues",
    }),

    // get location
    getLocations: builder.query({
      query: () => "/lookups/7/lookupvalues",
    }),

    // get employee categories
    getEmployeeCategories: builder.query({
      query: () => "/lookups/3/lookupvalues",
    }),

    // get grades
    getGrades: builder.query({
      query: () => "/grade",
    }),

    // get grade steps
    getGradeSteps: builder.query({
      query: (id) => `/grade/${id}/gradesteps`,
    }),
  }),
});

export const {
  useCreateElementMutation,
  useGetAllElementsQuery,
  useGetElementByIdQuery,
  useUpdateElementMutation,
  useDeleteElementMutation,
  useGetElementCategoriesQuery,
  useGetElementClassificationsQuery,
  useGetElementPayrunsQuery,
  useGetAllElementLinksQuery,
  useGetElementLinkByIdQuery,
  useCreateElementLinkMutation,
  useDeleteElementLinkMutation,
  useUpdateElementLinkMutation,
  useGetSuborganizationsQuery,
  useGetJobTitlesQuery,
  useGetLocationsQuery,
  useGetUnionsQuery,
  useGetEmployeeCategoriesQuery,
  useGetEmployeeTypesQuery,
  useGetGradesQuery,
  useGetDepartmentsQuery,
  useGetGradeStepsQuery,
} = api;

export default api;
