const { client } = require("./client.js");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");
const { activities, routines, routine_activities } = require("./seedData");

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });

    const sandra = await createUser({
      username: "sandra",
      password: "2sandy4me",
    });
    const glamgal = await createUser({
      username: "glamgal",
      password: "soglam",
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

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

  await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
        );
        `);
  console.log("Creating users table");

  await client.query(`
            CREATE TABLE routines (
                id SERIAL PRIMARY KEY,
                "creator_id" INTEGER REFERENCES users(id),
                is_public BOOLEAN DEFAULT false,
                name VARCHAR(255) UNIQUE NOT NULL,
                goal TEXT NOT NULL
            );
        `);
  console.log("Creating routines table");

  await client.query(`
           CREATE TABLE activities (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description	TEXT NOT NULL
           );  
        `);
  console.log("Creating activities table");

  await client.query(`
            CREATE TABLE routine_activities (
                "routine_id" INTEGER REFERENCES routines(id),
                "activity_id" INTEGER REFERENCES activities(id),
                duration INTEGER,
                count INTEGER,
                UNIQUE ("routine_id", "activity_id")
            );
        `);
  console.log("Creating routine activities table");

  console.log("Finished building tables!");
}
const seedDb = async () => {
  console.log(`seeding activities`);
  for (const activity of activities) {
    await createActivity(activity);
  }
  console.log("...seeding routines");
  for (const routine of routines) {
    await createRoutines(routine);
  }
  console.log("seeding routine_activities");
  for (const routine_activity of routine_activities) {
    await createRoutineActivity(routine_activity);
  }
};

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getUser();
    console.log("getUsers:", users);

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

    // await seedDb();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

//comment
