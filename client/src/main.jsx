import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import RoutinesProvider from "./components/RoutinesProvider";
import AuthProvider from "./components/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

// import Activities from "./components/Activities";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoutinesProvider>
          {/* <Activities> */}
          <App />
          {/* </Activities> */}
        </RoutinesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
