import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  fetchRoutineById,
  deleteRoutineById,
  updateRoutine,
} from "../api/routines";
import useRoutines from "../hooks/useRoutines";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SingleRoutine() {
  const { routineId } = useParams();
  const [singleRoutine, setSingleRoutine] = useState({});
  // const [name, setName] = useState("");
  // const [goal, setGoal] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getRoutineById() {
      const routine = await fetchRoutineById(routineId);
      setSingleRoutine(routine);
      console.log(singleRoutine);
      // setName(singleRoutine.name);
      // setGoal(singleRoutine.goal);
    }
    getRoutineById();
  }, []);
  async function deleteRoutine() {
    const result = await deleteRoutineById(singleRoutine.id, token);
    Navigate("/");
  }
  function displayEdit() {
    setShowEdit(true);
  }

  async function updateRoutineById() {
    const result = await updateRoutine(
      token,
      singleRoutine.id,
      is_public,
      name,
      goal
    );
    setShowEdit(false);
  }

  console.log(singleRoutine);

  return (
    <div>
      <div>
        <p>{singleRoutine.name} </p>
        <p>{singleRoutine.goal}</p>
      </div>
    </div>
  );
}

export default SingleRoutine;
