import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  fetchRoutineById,
  deleteRoutineById,
  updateRoutine,
} from "../api/routines";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SingleRoutine() {
  const { routineId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [singleRoutine, setSingleRoutine] = useState({});

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getRoutineById() {
      const routine = await fetchRoutineById(routineId);
      setSingleRoutine(routine);
      console.log(singleRoutine);
      setName(singleRoutine.name);
      setGoal(singleRoutine.goal);
    }
    getRoutineById();
  }, []);

  async function deleteRoutine(id) {
    const result = await deleteRoutineById(id);
    navigate("/");
  }
  function displayEdit() {
    setShowEdit(true);
  }

  async function updateRoutineById() {
    const result = await updateRoutine(singleRoutine.id, is_public, name, goal);
    setShowEdit(false);
  }

  console.log(singleRoutine);
  console.log(singleRoutine.creator_id);
  console.log(user.id);
  return (
    <div>
      <div>
        <p>Creator Name: {singleRoutine.creatorName}</p>
        <p>Routine: {singleRoutine.name} </p>
        <p>Goal: {singleRoutine.goal}</p>
      </div>
      <div>
        {singleRoutine?.activities?.map((activity) => {
          return (
            <div>
              <p>Activity: {activity.name}</p>
              <p>Description: {activity.description}</p>
              <p>Count: {activity.count}</p>
              <p>Duration: {activity.duration}</p>
            </div>
          );
        })}
      </div>
      {user?.id === singleRoutine?.creator_id && (
        <>
          <Button onClick={() => deleteRoutine(singleRoutine.id)}>
            Delete
          </Button>
          <Button onClick={displayEdit}>Edit</Button>
          {showEdit === true ? (
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await updateRoutine(
                  singleRoutine.id,
                  name,
                  goal
                );
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

                <button onClick={updateRoutineById} type="submit">
                  Submit{" "}
                </button>
              </div>
            </Form>
          ) : null}
        </>
      )}
    </div>
  );
}

export default SingleRoutine;
