const express = require('express');
const router = new express.Router;

const Question = require('../controllers/question/question');
const Reponse = require('../controllers/reponse/reponse');
const Serveur = require('../controllers/serveur/serveur');
const Point = require('../controllers/point/point');
const User = require('../controllers/user/user');

router.get('/', (req, res) => res.send({'content': "Bienvenu sur l'API LimiteJs"}))

//Question Route
router.post('/question/create', Question.create);
router.delete('/question/delete', Question.delete);
router.get('/question/find', Question.find);
router.get('/question/find/:id', Question.findById);

//Reponse Route
router.post('/reponse/create', Reponse.create);
router.delete('/reponse/delete', Reponse.delete);
router.get('/reponse/find', Reponse.find);
router.get('/reponse/find/:id', Reponse.findById);

//Serveur Route
router.post('/serveur/create', Serveur.create);
router.delete('/serveur/delete/:id', Serveur.delete);
router.patch('/serveur/addmember/:server_id/:user_id', Serveur.addMember);
router.delete('/serveur/delmember/:server_id/:user_id', Serveur.delMember);
router.get('/serveur/find', Serveur.find);
router.get('/serveur/find/:id', Serveur.findById);

//Point Route
router.post('/point/create', Point.create);
router.delete('/point/delete/:id', Point.delete);
router.patch('/point/update/:id', Point.update);
router.get('/point/find', Point.find);
router.get('/point/find/:id', Point.findById);

//User Route
router.post('/user/create', User.create);
router.delete('/user/delete/:id', User.delete);
router.patch('/user/update/:id', User.update);
router.get('/user/find', User.find);
router.get('/user/find/:id', User.findById);

module.exports = router;