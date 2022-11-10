import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import RoutinesProvider from "./components/RoutinesProvider";
// import Activities from "./components/Activities";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutinesProvider>
        {/* <Activities> */}
        <App />
        {/* </Activities> */}
      </RoutinesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
