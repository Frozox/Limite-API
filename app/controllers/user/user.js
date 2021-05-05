const User = require('../../models/user');

module.exports = {
    create : async (req, res) => {
        await new User(req.body).save().then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
    },
    delete : async (req, res) => {
        const delUser = await Serveur.findOneAndDelete({'user_id': `${req.body.user_id}`});
        if(!delUser) {
            res.status(404).send('Aucun utilisateur trouvé');
        }
        res.status(200).send();
    },
    find : async (req, res) => {
        await User.find()
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    },
    findById : async (req, res) => {
        var id = req.params.id;
        await User.findOne({user_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    }
}