import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import RoutinesProvider from "./components/RoutinesProvider";
import ActivitiesProvider from "./components/ActivitiesProvider";
import AuthProvider from "./components/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoutinesProvider>
          <ActivitiesProvider>
            <App />
          </ActivitiesProvider>
        </RoutinesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
