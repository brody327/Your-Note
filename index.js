require('dotenv').config();

const PORT = process.env.PORT || 3000;

//~~ IMPORTS ~~
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = require('./api');

const { client } = require('./db');

//~~ MIDDLEWARE ~~
//-- Server Setup --
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");

    next();
});

app.use('/api', apiRouter);

client.connect();

//-- Error Handling --
app.use((req, res, next) => {
    res.status(404);
    res.send({ error: 'Route was not found.' })
});

app.use((req, res, next) => {
    res.send(500);
    res.send({ error: error.message })
});

//Server Listener
app.listen(PORT, () => {
    console.log('The app is up and running on PORT ', PORT);
})