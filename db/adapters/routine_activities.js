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

module.exports = { addActivityToRoutine, destroyRoutineActivity };
