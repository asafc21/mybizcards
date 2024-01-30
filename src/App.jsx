// import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import loginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./store/searchContext";

function App() {
  const [login, setLogin] = useState(null);

  return (
    <loginContext.Provider value={{ login, setLogin }}>
      <SearchProvider>
        <ToastContainer />
        <LayoutComponent>
          <Router />
        </LayoutComponent>
      </SearchProvider>
    </loginContext.Provider>
  );
}

export default App;
