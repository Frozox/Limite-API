const Point = require('../../models/point');

module.exports = {
    create : async (req, res) => {
        await new Point(req.body).save().then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    },
    delete : async (req, res) => {
        if(!await Point.findByIdAndDelete(req.params.id)) {
            res.status(404).send('Point introuvable.');
        }
        res.status(200).send();
    },
    update : async (req, res) => {
        await Point.findByIdAndUpdate(req.params.id, req.body)
    },
    find : async (req, res) => {
        await Point.find()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(500).send(err);
        });
    },
    findById : async (req, res) => {
        await Point.findById(req.params.id)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(500).send(err);
        });
    }
}