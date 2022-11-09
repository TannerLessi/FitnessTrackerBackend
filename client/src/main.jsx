import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import RoutinesProvider from "./components/RoutinesProvider";
// import Activities from "./components/Activities";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoutinesProvider>
      {/* <Activities> */}
      <App />
      {/* </Activities> */}
    </RoutinesProvider>
  </React.StrictMode>
);
