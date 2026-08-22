import Header from "./components/Header";
import Main from "./components/Main";
import "./App.scss";

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <Main />
    </>
  );
}

export default App;
