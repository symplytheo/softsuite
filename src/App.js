import AppFooter from "./components/footer";
import AppHeader from "./components/header";
import Sidebar from "./components/sidebar";
import ElemetsPage from "./views/elements";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div>
        <AppHeader />
        <main>
          <ElemetsPage />
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
