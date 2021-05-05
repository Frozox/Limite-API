const Point = require('../../models/point');

module.exports = {
    create : async (req, res) => {

    },
    delete : async (req, res) => {

    },
    find : async (req, res) => {
        await Point.find({})
            .populate('server_id')
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send(error);
        });
    },
    findById : async (req, res) => {
        var id = req.params.id;
        await Point.findOne({_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    }
}