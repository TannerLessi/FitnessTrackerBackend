const { client } = require("../client");
const { getUserByUsername } = require("./users");

const getAllRoutines = async () => {
  try {
    const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routine_id" is NULL THEN'[]'::json
	ELSE
	JSON_AGG(
		JSON_BUILD_OBJECT(
		'id', activities.id,
		'name', activities.name,
		'description', activities.description,
		'count', ra.count,
		'duration', ra.duration
		)
	) END AS activities
	FROM routines	
	LEFT JOIN routine_activities AS ra
		ON routines.id = ra."routine_id"
	LEFT JOIN activities 
		ON ra."activity_id" = activities.id
	JOIN users
		ON routines."creator_id" = users.id	
	GROUP BY routines.id, ra."routine_id", users.username`);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getRoutineById = async (id) => {
  try {
    const {
      rows: [routine],
    } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routine_id" is NULL THEN'[]'::json
	ELSE
	JSON_AGG(
		JSON_BUILD_OBJECT(
		'id', activities.id,
		'name', activities.name,
		'description', activities.description,
		'count', ra.count,
		'duration', ra.duration
		)
	) END AS activities
	FROM routines	
	LEFT JOIN routine_activities AS ra
		ON routines.id = ra."routine_id"
	LEFT JOIN activities 
		ON ra."activity_id" = activities.id
	JOIN users
		ON routines."creator_id" = users.id	
    WHERE routines.id=${id}
	GROUP BY routines.id, ra."routine_id", users.username`);
    if (!routine) {
      return null;
    }
    return routine;
  } catch (error) {
    console.log(error);
  }
};

const getRoutinesWithoutActivities = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM routines`);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getAllPublicRoutines = async () => {
  try {
    const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routine_id" is NULL THEN'[]'::json
	ELSE
	JSON_AGG(
		JSON_BUILD_OBJECT(
		'id', activities.id,
		'name', activities.name,
		'description', activities.description,
		'count', ra.count,
		'duration', ra.duration
		)
	) END AS activities
	FROM routines	
	LEFT JOIN routine_activities AS ra
		ON routines.id = ra."routine_id"
	LEFT JOIN activities 
		ON ra."activity_id" = activities.id
		JOIN users
		ON routines."creator_id" = users.id
    WHERE routines.is_public = true
	GROUP BY routines.id, ra."routine_id", users.username`);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

async function createRoutines({ creator_id, is_public, name, goal }) {
  try {
    console.log(creator_id);
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines(creator_id, is_public, name, goal) 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
      `,
      [creator_id, is_public, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

const getPublicRoutinesByUser = async (username) => {
  try {
    //find user by username user =id
    // find the routine by creator id = user.id

    const { rows } = await client.query(`
	  SELECT routines.*, users.username AS "creatorName",
	  CASE WHEN ra."routine_id" is NULL THEN'[]'::json
	  ELSE
	  JSON_AGG(
		  JSON_BUILD_OBJECT(
		  'id', activities.id,
		  'name', activities.name,
		  'description', activities.description,
		  'count', ra.count,
		  'duration', ra.duration
		  )
	  ) END AS activities
	  FROM routines	
	  LEFT JOIN routine_activities AS ra
		  ON routines.id = ra."routine_id"
	  LEFT JOIN activities 
		  ON ra."activity_id" = activities.id
	  JOIN users
		  ON routines."creator_id" = users.id	
	  WHERE routines.is_public = true AND users.username ='${username}'
	  GROUP BY routines.id, ra."routine_id", users.username`);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getPublicRoutinesByActivity = async (activity_id) => {
  try {
    const { rows } = await client.query(`
	  SELECT routines.*, users.username AS "creatorName",
	  CASE WHEN ra."routine_id" is NULL THEN'[]'::json
	  ELSE
	  JSON_AGG(
		  JSON_BUILD_OBJECT(
		  'id', activities.id,
		  'name', activities.name,
		  'description', activities.description,
		  'count', ra.count,
		  'duration', ra.duration
		  )
	  ) END AS activities
	  FROM routines	
	  LEFT JOIN routine_activities AS ra
		  ON routines.id = ra."routine_id"
	  LEFT JOIN activities 
		  ON ra."activity_id" = activities.id
	  JOIN users
		  ON routines."creator_id" = users.id
		  WHERE routines.is_public = true AND ra.activity_id='${activity_id}'
	  GROUP BY routines.id, ra."routine_id", users.username`);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateRoutine = async (id, updateObject) => {
  const setString = Object.keys(updateObject)
    .map((key, i) => `"${key}"=$${i + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [updatedRoutines],
    } = await client.query(
      `
  		UPDATE routines
  		SET ${setString}
  		WHERE id=${id}
  		RETURNING *;
  	  `,
      Object.values(updateObject)
    );

    return updatedRoutines;
  } catch (error) {
    throw error;
  }
};

const destroyRoutine = async (routine_id) => {
  try {
    await client.query(
      `
		DELETE FROM routine_activities as ra
		  WHERE ra.routine_id =${routine_id} 
		  
	  `
    );
    const { rows } = await client.query(
      `
	  DELETE FROM routines
		WHERE id =${routine_id} 
		RETURNING *;
	`
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRoutines,
  createRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
};
