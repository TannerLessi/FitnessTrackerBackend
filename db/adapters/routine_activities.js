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

module.exports = { addActivityToRoutine };
