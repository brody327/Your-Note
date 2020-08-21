//~~ IMPORTS ~~
const apiRouter = require('express').Router();

const { } = require('../db');
const usersRouter = require('./users');


//~~ MIDDLEWARE ~~

usersRouter.use('/users', usersRouter);

//Error Handler
apiRouter.use((error, req, res, next) => {
    res.send(error);
})


//~~ EXPORTS ~~
module.exports = apiRouter;