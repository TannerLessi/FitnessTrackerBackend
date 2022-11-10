import "./App.css";
import { useState } from "react";
import useRoutines from "./hooks/useRoutines";
import useActivities from "./hooks/useActivities";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./components/RoutinesComponent";

function App() {
  // const { routines } = useRoutines();
  // const { activities } = useActivities();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
