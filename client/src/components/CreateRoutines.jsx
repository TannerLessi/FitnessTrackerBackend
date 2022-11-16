import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api/routines";
import useAuth from "../hooks/useAuth";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateNewRoutine() {
  const navigate = useNavigate();
  const [is_public, setIs_Public] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const { user } = useAuth();
  console.log("User", user);

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          window.location.reload();
          try {
            const result = await createRoutine(user.id, is_public, name, goal);
            navigate("/");
            console.log("Create Routine Result: ", result);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <h3>Create a New Routine</h3>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          value={name}
          type="text"
          placeholder="Enter a name for the routine."
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>Goal:</Form.Label>
        <Form.Control
          value={goal}
          type="text"
          placeholder="What is your goal?"
          onChange={(e) => {
            setGoal(e.target.value);
          }}
          as="textarea"
          rows={5}
        />
        <Form.Label>Make the routine public?:</Form.Label>
        <Form.Check
          value={is_public}
          type="checkbox"
          onChange={() => {
            setIs_Public(!is_public);
          }}
        ></Form.Check>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}
