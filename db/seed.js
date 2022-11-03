const { client } = require("./client.js");
const {
  createUsers,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");
const {
  createActivities,
  getActivities,
  getActivityById,
  updateActivity,
} = require("./adapters/activities");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");
const {
  getAllRoutines,
  createRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
} = require("./adapters/routines");
const {
  addActivityToRoutine,
  destroyRoutineActivity,
} = require("./adapters/routine_activities");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
  
      `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables..");
  console.log("Creating users table");
  await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
        );
        `);

  console.log("Creating routines table");
  await client.query(`
            CREATE TABLE routines (
                id SERIAL PRIMARY KEY,
                creator_id INTEGER REFERENCES users(id),
                is_public BOOLEAN DEFAULT false,
                name VARCHAR(255) UNIQUE NOT NULL,
                goal TEXT NOT NULL
            );
        `);

  console.log("Creating activities table");
  await client.query(`
           CREATE TABLE activities (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) UNIQUE NOT NULL,
            description	TEXT NOT NULL
           );  
        `);

  console.log("Creating routine activities table");
  await client.query(`
            CREATE TABLE routine_activities (
                routine_id INTEGER REFERENCES routines(id),
                activity_id INTEGER REFERENCES activities(id),
                duration INTEGER,
                count INTEGER,
                UNIQUE (routine_id, activity_id)
            );
        `);

  console.log("Finished building tables!");
}
const seedDb = async () => {
  console.log("...seeding users");
  for (const user of users) {
    await createUsers(user);
  }
  console.log("...seeding activities");
  for (const activity of activities) {
    await createActivities(activity);
  }

  console.log("...seeding routines");
  for (const routine of routines) {
    await createRoutines(routine);
  }

  console.log("...seeding routine_activities");
  for (const routine_activity of routine_activities) {
    await addActivityToRoutine(routine_activity);
  }
};

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("calling getUser");
    const users = await getUser();
    console.log("getUsers:", users);

    console.log("calling getUserId");
    const userId = await getUserById(1);
    console.log("getUserId", userId);

    console.log("calling getUserByUsername");
    const userName = await getUserByUsername("albert");
    console.log("getUserName", userName);

    console.log("calling getActivities");
    const activities = await getActivities();
    console.log("getActivies:", activities);

    console.log("calling getActivitiesById");
    const activitiesId = await getActivityById(2);
    console.log("getActivies:", activitiesId);

    console.log("calling updateActivity");
    const updatedActivities = await updateActivity(9, {
      name: "hangry",
      description: "eat more chip",
    });
    console.log("updatedActivities:", updatedActivities);

    console.log("calling getAllRoutines");
    const routines = await getAllRoutines();
    console.log("getRoutines:", routines);

    console.log("calling getRoutinesById");
    const routinesId = await getRoutineById(1);
    console.log("getRoutinesId", routinesId);

    console.log("calling getRoutinesWithoutActivities");
    const routinesWithoutActivities = await getRoutinesWithoutActivities();
    console.log("getRoutinesWithoutActivities", routinesWithoutActivities);

    console.log("calling getAllPublicRoutines");
    const allPublicRoutines = await getAllPublicRoutines();
    console.log("getAllPublicRoutines", allPublicRoutines);

    console.log("calling getPublicRoutinesByUser");
    const publicRoutinesByUser = await getPublicRoutinesByUser("albert");
    console.log("getPublicRoutinesByUser", publicRoutinesByUser);

    console.log("calling getPublicRoutinesByActivity");
    const publicRoutinesByActivity = await getPublicRoutinesByActivity("6");
    console.log("getPublicRoutinesByActivity", publicRoutinesByActivity);

    console.log("calling updateRoutine");
    const updateRoutines = await updateRoutine(1, {
      creator_id: 2,
      is_public: true,
      name: "Cardio Day UPDATE",
      goal: "Running, stairs. Stuff that gets your heart pumping!",
    });
    console.log("updateRoutine", updateRoutines);

    console.log("calling destroyRoutineActivity");
    const destroyRoutineActivities = await destroyRoutineActivity(5);
    console.log("destroyRoutineActivity", destroyRoutineActivities);

    // console.log("calling destroyRoutine");
    // const destroyRoutines = await destroyRoutine(5);
    // console.log("destroyRoutine", destroyRoutines);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

async function rebuildDB() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    console.error(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
