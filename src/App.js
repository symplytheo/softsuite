import AppFooter from "./components/footer";
import AppHeader from "./components/header";
import Sidebar from "./components/sidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ElementsPage from "./views/elements";
import ElementLinksPage from "./views/element-link";

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
  return <RouterProvider router={router} />;
}

export default App;
