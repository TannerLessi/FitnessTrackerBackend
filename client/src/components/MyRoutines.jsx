import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchMe } from "../api/auth";

import {
  fetchRoutineById,
  fetchRoutinesByUsername,
  deleteRoutineById,
  updateRoutine,
} from "../api/routines";
import UpdateCD from "./EditRA";

import { fetchActivityById } from "../api/activities";
import CreateNewRoutine from "./CreateRoutines";
import ActivitiesDropdownMenu from "./DropdownMenu";

import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    setRoutines(
      routines.filter((routine) => {
        return routine.id !== id;
      })
    );
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
              </div>
              {/* <ActivitiesDropdownMenu routineId={routine.id} /> */}
              <Button
                onClick={() => {
                  deleteRoutine(routine.id);
                  // window.location.reload();
                }}
              >
                delete
              </Button>
              <Button onClick={displayEdit}>Edit</Button>
              {showEdit === true ? (
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const result = await updateRoutine(routine.id, name, goal);
                    navigate("/");
                  }}
                >
                  <div>
                    <label></label>
                    <input
                      value={name}
                      type="text"
                      placeholder="Routine Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <label></label>
                    <input
                      value={goal}
                      type="text"
                      placeholder="goal"
                      onChange={(e) => {
                        setGoal(e.target.value);
                      }}
                    />
                    <UpdateCD />

                    <ActivitiesDropdownMenu routineId={routine.id} />
                    <button onClick={updateRoutineById} type="submit">
                      Submit{" "}
                    </button>
                  </div>
                </Form>
              ) : null}
            </>
          );
        })}
    </div>
  );
}

//comment
