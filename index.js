const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const conf = require('./config.json');

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./app/routes/routes'));

mongoose
    .connect(conf.DB_CON_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        app.listen(conf.API_PORT, () => {   //L'API ecoute sur le port
            console.log(`API listening on port :${conf.API_PORT}`)
        })
    })
