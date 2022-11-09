import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useRoutines from "./hooks/useRoutines";
import useActivities from "./hooks/useActivities";

function App() {
  const { routines } = useRoutines();
  // const { activities } = useActivities();

  return <div className="App">{JSON.stringify(routines)}</div>;
}

export default App;
