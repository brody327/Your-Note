//~~ IMPORTS ~~
//-- Client --
const { Client } = require('pg');
const connectionString = 'postgres://localhost:5432/note-db';
const client = new Client(connectionString);

//~~ EXPORTS ~~
module.exports = {
    client
}