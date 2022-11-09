import { useState, useEffect } from "react";
import RountinesContext from "../contexts/routinesContext";
import {
  fetchRoutines,
  fetchRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutineById,
} from "../api/routines";

export default function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getRoutines() {
      try {
        const allRoutines = await fetchRoutines();
        setRoutines(allRoutines);
      } catch (error) {
        console.log(error);
      }
    }
    getRoutines();
  }, []);

  return (
    <RountinesContext.Provider value={{ routines, setRoutines }}>
      {children}
    </RountinesContext.Provider>
  );
}
