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
              <h3>Creator:{routine.creatorName}</h3>
              <p>Routine Name:{routine.name}</p>

              {routine?.activities?.map((activity) => {
                return (
                  <div>
                    <p>Activity Name: {activity.name}</p>
                    <p>Description: {activity.description}</p>
                    <p>Count: {activity.count}</p>
                    <p>Duration: {activity.duration}</p>
                  </div>
                );
              })}

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
