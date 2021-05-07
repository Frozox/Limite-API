const User = require('../../models/user');
const Point = require('../../models/point')
const Serveur = require('../../models/serveur');

module.exports = {
    create : async (req, res) => {
        await new User(req.body).save().then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err);
        })
    },
    delete : async (req, res) => {
        if(!await User.findByIdAndDelete(req.params.id)) {
            res.status(404).send('Utilisateur introuvable.');
        }
        res.status(200).send();
    },
    update : async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
    },
    find : async (req, res) => {
        await User.find()
            .populate('points.server')
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
        });
    },
    findById : async (req, res) => {
        await User.findById(req.params.id)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(500).send(err);
        });
    }
}