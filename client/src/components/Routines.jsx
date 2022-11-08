import { useState, useEffect } from "react";
import rountineContext from "../contexts/routinesContext";

export default function routines({ children }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getRoutines() {
      try {
        const routines = await fetch("api/routines");
        const { allRoutines } = await routines.json();

        setRoutines(allRoutines);
      } catch (error) {
        console.log(error);
      }
    }
    getRoutines();
  }, []);

  return (
    <rountineContext.Provider value={{ routines, setRoutines }}>
      {children}
    </rountineContext.Provider>
  );
}
