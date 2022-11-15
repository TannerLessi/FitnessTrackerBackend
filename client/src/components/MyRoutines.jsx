import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchMe } from "../api/auth";

import { useNavigate } from "react-router-dom";
import { fetchRoutinesByUsername } from "../api/routines";

export default function Routines() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getUserRoutines() {
      if (user) console.log("MY ROUTINE", user);

      const userRoutines = await fetchRoutinesByUsername(user.username);
      setRoutines(userRoutines);

      setMessage("no current user");
    }
    getUserRoutines();
  }, []);
  console.log("MY ROUTINES", routines);
  return (
    <div>
      {routines &&
        routines.map((routine) => {
          return (
            <>
              <h2>Creator: {routine.creatorName}</h2>
              <div>Routine Name: {routine.name}</div>
              <div>Goal: {routine.goal}</div>
            </>
          );
        })}

      {/* {routines
        //.filter((routines) => routines.is_public)
        .map((arr) => {
          retrun(
            <div key={arr.id}>
              <p>routine: {arr.name}</p>
              <p>goal: {arr.goal}</p>
            </div>
          );
        })} */}
    </div>
  );
}
