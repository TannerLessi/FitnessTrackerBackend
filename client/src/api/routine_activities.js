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
