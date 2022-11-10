import { useState, useEffect } from "react";

import { fetchRoutines } from "../api/routines";

import useRoutines from "../hooks/useRoutines";

function RoutinesComponent() {
  const { routines, setRoutines } = useRoutines();

  useEffect(() => {
    const getRoutines = async () => {
      const data = await fetchRoutines();
      setRoutines(data);
      console.log(data);
    };
    getRoutines();
  }, []);
  console.log(routines);
  return (
    <div>
      {routines.map((routine) => {
        return (
          <div>
            <div>
              <h3> Creator:{routine.creatorName}</h3>
              <div>name:{routine.name}</div>
              <div>goal:{routine.goal}</div>
              <button>See Details</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoutinesComponent;
