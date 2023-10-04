import AppFooter from "./components/footer";
import AppHeader from "./components/header";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div>
        <AppHeader />
        <main></main>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
