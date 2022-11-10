import "./App.css";
import { useState } from "react";
import useRoutines from "./hooks/useRoutines";
import useActivities from "./hooks/useActivities";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./components/RoutinesComponent";
import NavBar from "./components/NavBar";

function App() {
  // const { routines } = useRoutines();
  // const { activities } = useActivities();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<RoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
