const Point = require('../../models/point');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    addWin: async (req, res) => {
        const point = await Point.findByIdAndUpdate(req.params.id, {
            $inc: { win: 1 }
        })

        if (point) {
            res.status(200).json({ message: MESSAGES.models.point.addWin[200] });
        }
        else {
            res.status(500).json({ message: MESSAGES.models.point.addWin[500] });
        }
    },
    remWin: async (req, res) => {
        const point = await Point.findByIdAndUpdate(req.params.id, {
            $inc: { win: -1 }
        });

        if (point) {
            res.status(200).json({ message: MESSAGES.models.point.remWin[200] });
        }
        else {
            res.status(500).json({ message: MESSAGES.models.point.remWin[500] });
        }
    },
    /*setWin : async (req, res) => {
    },
    resetWin : async (req, res) => {
    },*/
    findPoint: async (req, res) => {
        await Point.findOne({ server: req.params.server_id, user: req.params.user_id }, { __v: 0 })
            .then((result) => {
                if (result == null) {
                    res.status(404).json({ message: MESSAGES.models.point.findPoint[404] });
                }
                else {
                    res.status(200).json(result);
                }
            })
            .catch(() => {
                res.status(500).json({ message: MESSAGES.models.point.findPoint[500] });
            });
    }
}