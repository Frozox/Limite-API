const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRouter = require('./routers/question');

const conf = require('../config.json');

mongoose
    .connect(conf.DB_CON_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        
        app.use(questionRouter);

        app.get('/', function(req, res) {
            res.send({"content": "Bienvenu sur l'API LimiteJs"})
        })

        app.listen(conf.API_PORT, () => {   //L'API ecoute sur le port
            console.log(`API listening on port :${conf.API_PORT}`)
        })
    })
