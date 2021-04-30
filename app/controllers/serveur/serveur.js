const Serveur = require('../../models/serveur');

module.exports = {
    create : async (req, res) => {

    },
    delete : async (req, res) => {

    },
    find : async (req, res) => {
        await Serveur.find()
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    },
    findById : async (req, res) => {
        var id = req.params.id;
        await Serveur.findOne({_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}