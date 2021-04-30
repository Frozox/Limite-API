const express = require('express');
const router = new express.Router;

const Question = require('./controllers/question/question');
const Reponse = require('./controllers/reponse/reponse');
const Serveur = require('./controllers/serveur/serveur');
const User = require('./controllers/user/user');
const Point = require('./controllers/point/point');

router.get('/', (req, res) => res.send({'content': "Bienvenu sur l'API LimiteJs"}))

//Question Route
router.post('/question/create', Question.create);
router.post('/question/delete/:id', Question.delete);
router.get('/question/find', Question.find);
router.get('/question/find/:id', Question.findById);

//Reponse Route
router.post('/reponse/create', Reponse.create);
router.post('/reponse/delete/:id', Reponse.delete);
router.get('/reponse/find', Reponse.find);
router.get('/reponse/find/:id', Reponse.findById);

//Serveur Route
router.post('/serveur/create', Serveur.create);
router.post('/serveur/delete/:id', Serveur.delete);
router.get('/serveur/find', Serveur.find);
router.get('/serveur/find/:id', Serveur.findById);

//User Route
router.post('/user/create', User.create);
router.post('/user/delete/:id', User.delete);
router.get('/user/find', User.find);
router.get('/user/find/:id', User.findById);

//Point Route
router.post('/point/create', Point.create);
router.post('/point/delete/:id', Point.delete);
router.get('/point/find', Point.find);
router.get('/point/find/:id', Point.findById);

module.exports = router;