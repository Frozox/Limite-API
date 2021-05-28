const express = require('express');
const router = new express.Router;

const Question = require('../controllers/question/question');
const Reponse = require('../controllers/reponse/reponse');
const Serveur = require('../controllers/serveur/serveur');
const Point = require('../controllers/point/point');
const User = require('../controllers/user/user');

router.get('/', (req, res) => res.send({
    message: "Bienvenu sur l'API LimiteJs",
    version: process.env.npm_package_version,
    author: process.env.npm_package_author_name,
    library: 'Node.js'
}));

//Question Route
router.post('/question/create', Question.create);
router.delete('/question/delete/:id', Question.delete);
router.get('/question/findonerandomly', Question.findOneRandomly);
router.get('/question/find/:id', Question.findById);

//Reponse Route
router.post('/reponse/create', Reponse.create);
router.delete('/reponse/delete/:id', Reponse.delete);
router.get('/reponse/findrandomly', Reponse.findRandomly);
router.get('/reponse/find/:id', Reponse.findById);

//Serveur Route
router.post('/serveur/create', Serveur.create);
router.delete('/serveur/delete/:id', Serveur.delete);
router.patch('/serveur/addmember/:server_id/:user_id', Serveur.addMember);
router.delete('/serveur/delmember/:server_id/:user_id', Serveur.delMember);
router.get('/serveur/find', Serveur.find);
router.get('/serveur/find/:id', Serveur.findById);

//Point Route
router.patch('/point/addwin/:id', Point.addWin);
router.patch('/point/remwin/:id', Point.remWin);
router.get('/point/find/:server_id/:user_id', Point.findPoint);

//User Route
router.post('/user/create', User.create);
router.delete('/user/delete/:id', User.delete);
router.patch('/user/update/:id', User.update);
router.get('/user/find', User.find);
router.get('/user/find/:id', User.findById);

module.exports = router;