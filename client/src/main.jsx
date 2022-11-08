import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Routines from "./components/Routines";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routines>
      <App />
    </Routines>
  </React.StrictMode>
);
