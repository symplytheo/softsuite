import AppFooter from "./components/footer";
import AppHeader from "./components/header";
import Sidebar from "./components/sidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ElementsPage from "./views/elements";
import ElementLinksPage from "./views/element-link";
import {
  useGetElementCategoriesQuery,
  useGetElementClassificationsQuery,
  useGetElementPayrunsQuery,
  useGetEmployeeCategoriesQuery,
  useGetEmployeeTypesQuery,
  useGetGradesQuery,
  useGetJobTitlesQuery,
  useGetLocationsQuery,
  useGetSuborganizationsQuery,
  useGetUnionsQuery,
} from "./lib/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setElementCategories,
  setElementClassification,
  setElementPayruns,
  setEmployeeCategories,
  setEmployeeTypes,
  setGrades,
  setJobTitles,
  setLocations,
  setSuborganizations,
  setUnions,
} from "./store/root";

const Layout = () => (
  <div className="App">
    <Sidebar />
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
    <AppFooter />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ElementsPage /> },
      { path: "/:elementId", element: <ElementLinksPage /> },
    ],
  },
]);

function App() {
  const { data: categories } = useGetElementCategoriesQuery();
  const { data: classifications } = useGetElementClassificationsQuery();
  const { data: payruns } = useGetElementPayrunsQuery();
  const { data: suborganizations } = useGetSuborganizationsQuery();
  const { data: locations } = useGetLocationsQuery();
  const { data: jobtitles } = useGetJobTitlesQuery();
  const { data: employeeCategories } = useGetEmployeeCategoriesQuery();
  const { data: employeeTypes } = useGetEmployeeTypesQuery();
  const { data: unions } = useGetUnionsQuery();
  const { data: grades } = useGetGradesQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setElementCategories(categories || []));
    dispatch(setElementClassification(classifications || []));
    dispatch(setElementPayruns(payruns || []));
    dispatch(setSuborganizations(suborganizations?.data || []));
    dispatch(setLocations(locations));
    dispatch(setJobTitles(jobtitles));
    dispatch(setEmployeeCategories(employeeCategories));
    dispatch(setUnions(unions));
    dispatch(setEmployeeTypes(employeeTypes));
    dispatch(setGrades(grades?.data || []));
  }, [
    categories,
    classifications,
    payruns,
    suborganizations,
    locations,
    unions,
    employeeCategories,
    employeeTypes,
    jobtitles,
    grades,
    dispatch,
  ]);

  return <RouterProvider router={router} />;
}

export default App;
