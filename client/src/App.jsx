import "./App.css";
import { useState } from "react";
import useRoutines from "./hooks/useRoutines";
import useActivities from "./hooks/useActivities";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./components/Routines";
import NavBar from "./components/NavBar";
import AuthComponent from "./components/Auth";
import SingleRoutine from "./components/SingleRoutine";
import CreateRoutines from "./components/CreateRoutines";
import ActivitiesComponent from "./components/Activities";

function App() {
  // const { routines } = useRoutines();
  // const { activities } = useActivities();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/:method" element={<AuthComponent />} />
        <Route path="/" element={<RoutinesComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/routines/:routineId" element={<SingleRoutine />} />
        <Route path="/routines/create_routine" element={<CreateRoutines />} />
      </Routes>
    </div>
  );
}

export default App;
