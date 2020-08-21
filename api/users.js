const users = require('../db/users');
const { getAllUsers } = require('../db/users');

//~~ IMPORTS ~~
const usersRouter = require('express').Router();

const { } = require('../db');

//~~ MIDDLEWARE ~~
usersRouter.use((req, res, next) => {
    try {
        res.send('Accessing users api routes...')
    } catch (error) {
        next(error);
    }
});

usersRouter.get('/', async (req, res, send) => {
    try {
        console.log("here")
        const users = await getAllUsers();

        res.send({
            users
        })
    } catch (error) {
        next(error);
    }
})
//~~ EXPORTS ~~
module.exports = usersRouter;