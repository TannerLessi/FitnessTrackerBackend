import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoutineCard({
  singleRoutine,
  displayEdit,
  deleteRoutine,
  updateRoutine,
  name,
  setName,
  goal,
  setGoal,
}) {
  const navigate = useNavigate();
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
              <p> Activity: {activity.name}</p>
              <p> Description: {activity.description}</p>
              <p> Count: {activity.count}</p>
              <p> Duration: {activity.duration}</p>
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
