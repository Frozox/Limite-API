const Question = require('../../models/question');

module.exports = {
    create : async (req, res) => {

    },
    delete : async (req, res) => {

    },
    find : async (req, res) => {
        await Question.find()
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    },
    findById : async (req, res) => {
        var id = req.params.id;
        await Question.findOne({question_id : id})
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
        });
    }
}