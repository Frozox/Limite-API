const User = require('../../models/user');
const Point = require('../../models/point')
const Serveur = require('../../models/serveur');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    create: async (req, res) => {
        await new User(req.body).save().then(() => {
            res.status(200).json({
                message: MESSAGES.models.user.create[200]
            });
        }).catch(() => {
            res.status(500).json({ message: MESSAGES.models.user.create[500] });
        })
    },
    delete: async (req, res) => {
        const user = await User.findOneAndDelete({ user_id: req.params.id });

        if (user) {
            //Find Point/Serveur
            await Point.find({ user: user._id }).then((points) => {
                points.forEach(point => {

                    //Rem User to Serveur
                    Serveur.findByIdAndUpdate(point.server, {
                        $pull: { members: user._id }
                    }).exec();
                })
            });

            //Rem Point
            await Point.deleteMany({ user: user._id }).exec();

            res.status(200).json({ message: MESSAGES.models.user.delete[200] });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.user.delete[404] });
        }
    },
    update: async (req, res) => {
        const user = await User.findOne({ user_id: req.params.id }, { _id: 1 });

        if (user) {
            await User.findByIdAndUpdate(user._id, req.body).then(() => {
                res.status(200).json({ message: MESSAGES.models.user.update[200] });
            })
                .catch(() => {
                    res.status(500).json({ message: MESSAGES.models.user.update[500] });
                });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.user.update[404] });
        }
    },
    findById: async (req, res) => {
        await User.findOne({ user_id: req.params.id }, { points: 0, _id: 0, __v: 0 })
            .then((result) => {
                if (result == null) {
                    res.status(404).json({ message: MESSAGES.models.user.findById[404] });
                }
                else {
                    res.status(200).json(result);
                }
            })
            .catch(() => {
                res.status(500).json({ message: MESSAGES.models.user.findById[500] });
            });
    },
    count: async (req, res) => {
        await User.countDocuments({}).then((result) => {
            res.status(200).json({ count: result });
        });
    }
}