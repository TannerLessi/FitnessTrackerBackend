export async function fetchRoutines() {
  const response = await fetch("/api/routines");
  const result = await response.json();
  return result;
}

export async function fetchRoutineById(id) {
  const response = await fetch("/api/routines");
  const result = await response.json();
  const singleRoutine = result.routines.filter((e) => {
    return (e._id = id);
  })[0];
  return singleRoutine;
}

export async function createRoutine(token, creator_id, is_public, name, goal) {
  const response = await fetch("api/routines", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      routine: {
        creator_id,
        is_public,
        name,
        goal,
      },
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateRoutine(token, creator_id, is_public, name, goal) {
  const response = await fetch("api/routines/creator_id", {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      routine: {
        creator_id,
        is_public,
        name,
        goal,
      },
    }),
  });
  const result = await response.json();
  return result;
}

export async function deleteRoutineById(id, token) {
  const response = await fetch("api/routines/id", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}
