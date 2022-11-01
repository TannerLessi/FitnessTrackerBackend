const { client } = require("./client.js");

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

async function rebuildDB() {
  client.connect();
  try {
    await createTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

// rebuildDB()
//   .then(testDB)
//   .catch(console.error)
//   .finally(() => client.end());
