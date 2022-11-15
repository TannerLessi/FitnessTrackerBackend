const { client } = require("../client");

async function createActivities({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        INSERT INTO activities(name, description) 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [name, description]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

async function getActivities() {
  try {
    const { rows } = await client.query(
      `SELECT *
      FROM activities;
    `
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
}

const getActivityById = async (activity_id) => {
  const {
    rows: [activity],
  } = await client.query(
    `
    SELECT * FROM activities
    WHERE id=${activity_id}
  `
  );
  return activity;
};

const updateActivity = async (id, updateObject) => {
  const setString = Object.keys(updateObject)
    .map((key, i) => `"${key}"=$${i + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [updatedActivities],
    } = await client.query(
      `
  		UPDATE activities
  		SET ${setString}
  		WHERE id=${id}
  		RETURNING *;
  	  `,
      Object.values(updateObject)
    );

    return updatedActivities;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createActivities,
  getActivities,
  getActivityById,
  updateActivity,
};
