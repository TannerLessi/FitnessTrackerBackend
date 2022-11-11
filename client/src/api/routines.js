export async function fetchRoutines() {
  const response = await fetch("/api/routines");
  const result = await response.json();
  return result;
}

export async function fetchRoutineById(id) {
  const response = await fetch(`/api/routines/${id}`);
  const result = await response.json();
  return result;
}

export async function createRoutine(creator_id, is_public, name, goal) {
  const response = await fetch("api/routines", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      creator_id,
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateRoutine(id, is_public, name, goal) {
  const response = await fetch(`api/routines/${id}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();
  return result;
}

export async function deleteRoutineById(id) {
  const response = await fetch(`api/routines/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}
