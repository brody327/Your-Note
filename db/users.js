//~~ IMPORTS ~~
const { client } = require("./client");

//~~ FUNCTIONS ~~
//Get all users in table.
async function getAllUsers() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM users;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

//Create a user in the database.
async function createUser({ username, password }) {
    try {
        const { rows } = await client.query(`
            INSERT INTO users(username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password]);

        return rows;
    } catch (error) {
        throw error;
    }
}

//~~ EXPORTS ~~
module.exports = {
    getAllUsers,
    createUser
}