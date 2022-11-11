import { useState, useEffect } from "react";

import { fetchRoutines } from "../api/routines";

import useRoutines from "../hooks/useRoutines";

import { useNavigate } from "react-router-dom";

function RoutinesComponent() {
  const { routines, setRoutines } = useRoutines();
  const navigate = useNavigate();
  useEffect(() => {
    const getRoutines = async () => {
      const data = await fetchRoutines();
      setRoutines(data);
      console.log(data);
    };
    getRoutines();
  }, []);
  console.log("routine", routines);
  return (
    <div>
      {routines.map((routine) => {
        return (
          <div>
            <div>
              <h3> Creator:{routine.creatorName}</h3>
              <div>name:{routine.name}</div>
              <div>goal:{routine.goal}</div>
              <button
                onClick={() => {
                  navigate(`/routines/${routine.id}`);
                }}
              >
                See Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoutinesComponent;
