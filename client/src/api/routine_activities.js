export async function fetchAddRA(routine_id, activity_id, count, duration) {
  try {
    const response = await fetch("/api/routine_activities", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        routine_id,
        activity_id,
        count,
        duration,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function editRA(routineActivityId, count, duration) {
  const response = await fetch(`/api/routine_activities/${routineActivityId}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      count,
      duration,
    }),
  });
  const result = await response.json();
  return result;
}

export async function deleteRA(routineId, activityId) {
  const response = await fetch(
    `/api/routine_activities/${routineId}/${activityId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}
