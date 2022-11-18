import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { deleteRA } from "../api/routine_activities";

export default async function DeleteActivityFromRA(routineId, activityId) {
  const result = await deleteRA(routineId, activityId);

  return (
    <div>
      <Button
        onClick={() => {
          DeleteActivityFromRA(routineId, activityId);
        }}
      >
        Delete Activity
      </Button>
    </div>
  );
}
