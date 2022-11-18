import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRA } from "../api/routine_activities";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function UpdateCD() {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const { routineActivityId } = useParams();

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await editRA(routineActivityId, count, duration);
        }}
      >
        <div>
          <input
            value={count}
            type="text"
            placeholder="Count"
            onChange={(e) => {
              setCount(+e.target.value);
            }}
          />
          <input
            value={duration}
            type="text"
            placeholder="Duration"
            onChange={(e) => {
              setDuration(+e.target.value);
            }}
          />
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </div>
  );
}
