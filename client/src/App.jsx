import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useRoutines from "./hooks/routines";

function App() {
  const { routines } = useRoutines();

  return <div className="App">{JSON.stringify(routines)}</div>;
}

export default App;
