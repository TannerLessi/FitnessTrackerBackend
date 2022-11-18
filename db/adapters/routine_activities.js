const { client } = require("../client");

const addActivityToRoutine = async ({
  routine_id,
  activity_id,
  count,
  duration,
}) => {
  try {
    const {
      rows: [ra],
    } = await client.query(
      `
        
                  INSERT INTO routine_activities (routine_id, activity_id, count, duration)
                  VALUES($1, $2, $3, $4)
                  RETURNING *;
                  `,
      [routine_id, activity_id, count, duration]
    );
    return ra;
  } catch (error) {
    throw error;
  }
};

const getRoutineActivityById = async (routine_activitiesId) => {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(`
    SELECT * FROM routine_activities
    WHERE id=${routine_activitiesId}
    `);
    if (!routine_activity) {
      return null;
    }
    return routine_activity;
  } catch (error) {
    console.log(error);
  }
};

const updateRoutineActivity = async (id, updateObject) => {
  const setString = Object.keys(updateObject)
    .map((key, i) => `"${key}"=$${i + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [updatedRoutineActivity],
    } = await client.query(
      `
  		UPDATE routine_activities
  		SET ${setString}
  		WHERE id=${id}
  		RETURNING *;
  	  `,
      Object.values(updateObject)
    );

    return updatedRoutineActivity;
  } catch (error) {
    throw error;
  }
};

const destroyRoutineActivity = async (routine_id) => {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM routine_activities as ra
        WHERE ra.routine_id =${routine_id} 
        RETURNING *;
        
    `
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getRoutineActivitiesByRoutine = async (id) => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routine_activities
    WHERE routine_id=${id}
    `);
    if (!rows) {
      return null;
    }
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateRA = async (routineId, activityId, count, duration) => {
  // update the routineActivity where ...
};

module.exports = {
  addActivityToRoutine,
  destroyRoutineActivity,
  getRoutineActivityById,
  updateRoutineActivity,
  getRoutineActivitiesByRoutine,
};
