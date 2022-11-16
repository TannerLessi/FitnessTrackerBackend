import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchMe } from "../api/auth";
import Button from "react-bootstrap/Button";
import {
  fetchRoutineById,
  fetchRoutinesByUsername,
  deleteRoutineById,
  updateRoutine,
} from "../api/routines";
import { fetchActivityById } from "../api/activities";
import CreateNewRoutine from "./CreateRoutines";
export default function MyRoutines() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getUserRoutines() {
      if (user) console.log("MY ROUTINE", user);

      const userRoutines = await fetchRoutinesByUsername(user.username);
      console.log("USER", user);
      console.log("ROUTINES", routines);
      console.log("userROutines", userRoutines);
      setRoutines(userRoutines);
    }
    getUserRoutines();
  }, [user]);

  async function deleteRoutine(id) {
    // this deletes the routine from the DB
    const result = await deleteRoutineById(id);
    // we need to also need to manually remove it from react
    // filter through all your routines, and remove the one you just deleted

    // reset the routines setRoutines(filteredRoutines)
  }
  function displayEdit() {
    setShowEdit(true);
  }

  async function updateRoutineById(id, is_public, name, goal) {
    const result = await updateRoutine(id, is_public, name, goal);
    setShowEdit(false);
  }

  return (
    <div>
      <CreateNewRoutine />
      {routines &&
        routines.map((routine) => {
          return (
            <>
              <div>
                <h2>Creator: {routine.creatorName}</h2>
                <div>Routine Name: {routine.name}</div>
                <div>Goal: {routine.goal}</div>
              </div>
              <div>
                {routine?.activities?.map((activity) => {
                  return (
                    <div>
                      <p> Activity: {activity.name}</p>
                      <p> Description: {activity.description}</p>
                      <p> Count: {activity.count}</p>
                      <p> Duration: {activity.duration}</p>
                    </div>
                  );
                })}
                <Button
                  onClick={() => {
                    deleteRoutine(routine.id);
                    window.location.reload();
                  }}
                >
                  delete
                </Button>
              </div>
            </>
          );
        })}
    </div>
  );
}
