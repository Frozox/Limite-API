const Reponse = require('../../models/reponse');

module.exports = {
    create : async (req, res) => {

    },
    delete : async (req, res) => {

    },
    find : async (req, res) => {
        await Reponse.find()
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    },
    findById : async (req, res) => {
        var id = req.params.id;
        await Reponse.findOne({reponse_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    }
}