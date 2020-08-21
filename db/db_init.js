//~~ IMPORTS ~~
const { client } = require('./client');
const { getAllUsers, createUser } = require('./index');

//~~ FUNCTIONS ~~
//-- Testing --
//Drops all database tables for re-initialization.
async function dropTables() {
    try {
        console.log("Dropping tables...")

        client.query(`
        DROP TABLE IF EXISTS user_notes;
        DROP TABLE IF EXISTS notes;
        DROP TABLE IF EXISTS users;
        `);

        console.log("Tables successfully created!")
    } catch (error) {
        console.log("Error dropping tables.")
    }
}

//Creates all database tables for initializtion.
async function createTables() {
    try {
        console.log("Creating tables...")
        //Creates users table.
        await client.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE notes (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id) NOT NULL,
            title VARCHAR(255) NOT NULL,
            "postDate" DATE NOT NULL DEFAULT CURRENT_DATE,
            public BOOLEAN DEFAULT true,
            content TEXT NOT NULL
            );
        `)

        await client.query(`
            CREATE TABLE user_notes (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "noteId" INTEGER REFERENCES notes(id) NOT NULL 
            );
        `);
        console.log("Tables successfully created!")

    } catch (error) {
        console.log("Error creating tables.")
    }
}

//Create initial users.
async function createInitialUsers() {
    try {
        console.log("Creating initial users...")
        await createUser({ username: "brody", password: "password" });
        console.log("Initial users successfully created!")
    } catch (error) {
        console.log("Error creating initial users.")
    }
}

//Rebuilds database to re-initialize default state.
async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        throw error;
    }
}

//Test the database's functions.
async function testDB() {
    try {
        console.log("Testing getAllUsers...")
        const users = await getAllUsers();
        console.log(users);
        console.log("Finished getAllUsers!")
    } catch (error) {
        throw error;
    }
}

//~~ MAIN ~~
rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());