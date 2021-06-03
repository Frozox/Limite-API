const Point = require('../../models/point');
const Serveur = require('../../models/serveur');
const User = require('../../models/user');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    addWin: async (req, res) => {
        const server = await Serveur.findOne({ server_id: req.body.server_id }, { _id: 1 });
        const user = await User.findOne({ user_id: req.body.user_id }, { _id: 1 });

        if (server && user) {
            await Point.findOneAndUpdate({ server: server._id, user: user._id }, {
                $inc: { win: 1 }
            }).then((result) => {
                if (result) {
                    res.status(200).json({ message: MESSAGES.models.point.addWin[200] });
                }
                else {
                    res.status(404).json({ message: MESSAGES.models.point.addWin[404][0] });
                }
            });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.point.addWin[404][1] });
        }
    },
    remWin: async (req, res) => {
        const server = await Serveur.findOne({ server_id: req.body.server_id }, { _id: 1 });
        const user = await User.findOne({ user_id: req.body.user_id }, { _id: 1 });

        if (server && user) {
            const point = await Point.findOne({ server: server._id, user: user._id }, { win: 1 });

            if (point) {
                if (point.win <= 0) {
                    res.status(500).json({ message: MESSAGES.models.point.remWin[500] });
                }
                else {
                    await Point.findOneAndUpdate({ server: server._id, user: user._id }, {
                        $inc: { win: -1 }
                    }).then(() => {
                        res.status(200).json({ message: MESSAGES.models.point.remWin[200] });
                    });
                }
            }
            else {
                res.status(404).json({ message: MESSAGES.models.point.remWin[404][0] });
            }
        }
        else {
            res.status(404).json({ message: MESSAGES.models.point.remWin[404][1] });
        }
    },
    /*setWin : async (req, res) => {
    },
    resetWin : async (req, res) => {
    },*/
    findPoint: async (req, res) => {
        const server = await Serveur.findOne({ server_id: req.params.server_id }, { _id: 1 });
        const user = await User.findOne({ user_id: req.params.user_id }, { _id: 1 });

        if (server && user) {
            await Point.findOne({ server: server._id, user: user._id }, { win: 1, _id: 0 }).then((result) => {
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(404).json({ message: MESSAGES.models.point.findPoint[404][0] });
                }
            })
        }
        else {
            res.status(404).json({ message: MESSAGES.models.point.findPoint[404][1] });
        }
    }
}