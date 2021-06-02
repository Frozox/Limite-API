const Question = require('../../models/question');
const Tools = require('../../models/Tools');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    create: async (req, res) => {
        await new Question(req.body).save().then(() => {
            res.status(200).json({ message: MESSAGES.models.question.create[200] });
        }).catch((err) => {
            res.status(500).json({ message: MESSAGES.models.question.create[500] });
        })
    },
    delete: async (req, res) => {
        const question = await Question.findOneAndDelete({ question_id: req.params.id });

        if (question) {
            res.status(200).json({ message: MESSAGES.models.question.delete[200] });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.question.delete[404] });
        }
    },
    findOneRandomly: async (req, res) => {
        var cache = [];

        if (req.query.cache) {
            cache = Tools.decodeStringToArray(decodeURI(req.query.cache));
        }

        await Question.aggregate([
            { $match: { question_id: { $nin: cache } } },
            { $project: { _id: 0, __v: 0 } },
            { $sample: { size: 1 } },
        ]).then((result) => {
            if (result.length === 0) {
                res.status(404).json({ message: MESSAGES.models.question.findOneRandomly[404] });
            }
            else {
                cache.push(result[0].question_id);
                result[0].cache = encodeURI(Tools.encodeArrayToString(cache));
                res.status(200).json(result[0]);
            }
        });
    },
    findById: async (req, res) => {
        var cache = [];

        if (req.query.cache) {
            cache = Tools.decodeStringToArray(decodeURI(req.query.cache));
        }

        await Question.findOne({ question_id: req.params.id }, { _id: 0, __v: 0 })
            .then((result) => {
                if (result) {
                    if (!cache.includes(result.question_id)) {
                        cache.push(result.question_id);
                    }

                    var res_json = result.toJSON();
                    res_json.cache = encodeURI(Tools.encodeArrayToString(cache));
                    res.status(200).json(res_json);
                }
                else {
                    res.status(404).json({ message: MESSAGES.models.question.findById[404] });
                }
            }).catch((err) => {
                res.status(500).json({ message: MESSAGES.models.question.findById[500] });
            });
    },
    count: async (req, res) => {
        await Question.countDocuments({}).then((result) => {
            res.status(200).json({ count: result });
        });
    }
}