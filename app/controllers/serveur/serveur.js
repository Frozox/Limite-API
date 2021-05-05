const Serveur = require('../../models/serveur');

module.exports = {
    create : async (req, res) => {
        await new Serveur(req.body).save().then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
    },
    delete : async (req, res) => {
        const delServeur = await Serveur.findOneAndDelete({'server_id': `${req.body.server_id}`});
        if(!delServeur) {
            res.status(404).send('Aucun serveur trouvé');
        }
        res.status(200).send();
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
        await Serveur.findOne({server_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    }
}