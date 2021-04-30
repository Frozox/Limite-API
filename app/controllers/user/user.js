const User = require('../../models/user');

module.exports = {
    create : async (req, res) => {

    },
    delete : async (req, res) => {

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
        await User.findOne({_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}