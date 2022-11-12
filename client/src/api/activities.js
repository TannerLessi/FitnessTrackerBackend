export async function fetchActivities() {
  const response = await fetch("/api/activities");
  const result = await response.json();
  return result;
}

export async function fetchActivityById(id) {
  const response = await fetch(`/api/activities/${id}`);
  const result = await response.json();
  return result;
}

export async function createActivities(name, description) {
  try {
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function updateActivity(id, name, description) {
  const response = await fetch(`/api/activites/${id}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}
