import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivities } from "../api/activities";
import useAuth from "../hooks/useAuth";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateNewActivity() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("Error Messgae");
  const { user } = useAuth();

  return (
    <div>
      {user.username !== "Guest" ? (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();

            const result = await createActivities(name, description);
            navigate("/");
            console.log("Create Activity Result: ", result);
          }}
        >
          <h3>Create a New Activity</h3>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            value={name}
            type="text"
            placeholder="Enter a name for the activity."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Form.Label>Description:</Form.Label>
          <Form.Control
            value={description}
            type="text"
            placeholder="Enter a description for the activity."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            as="textarea"
            rows={5}
          />
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      ) : null}
    </div>
  );
}
