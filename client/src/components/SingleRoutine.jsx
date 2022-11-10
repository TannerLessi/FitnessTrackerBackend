import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  getRoutineById,
  deleteRoutineById,
  updateRoutine,
} from "../api/routines";
import useRoutines from "../hooks/useRoutines";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SingleRoutine() {
  console.log;
  const [singleRoutine, setSingleRoutine] = useState({});
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getRoutineById() {
      setSingleRoutine(data);
      setName(singleRoutine.name);
      setGoal(singleRoutine.goal);
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
  return (
    <div>
      <h3>{singleRoutine.name} </h3>
      <p>{singleRoutine.goal}</p>
    </div>
  );
}

export default SingleRoutine;
