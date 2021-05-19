const Point = require('../../models/point');

module.exports = {
    addWin : async (req, res) => {
        await Point.findByIdAndUpdate(req.params.id, {
            $inc: {win: 1}
        }).then(() => {
            res.status(200).json({message: 'Win added to User.'});
        }).catch(() => {
            res.status(500).json({message: 'Invalid parameters.'});
        });
    },
    remWin : async (req, res) => {
        await Point.findByIdAndUpdate(req.params.id, {
            $inc: {win: -1}
        }).then(() => {
            res.status(200).json({message: 'Win removed to User.'});
        }).catch(() => {
            res.status(500).json({message: 'Invalid parameters.'});
        });
    },
    /*setWin : async (req, res) => {
    },
    resetWin : async (req, res) => {
    },*/
    findPoint : async (req, res) => {
        await Point.findOne({server: req.params.server_id, user: req.params.user_id})
            .then((result) => {
                if(result == null){
                    res.status(404).json({message: 'Point not found.'});
                }
                else{
                    res.status(200).json(result);
                }
            })
            .catch(() => {
                res.status(500).json({message: 'Invalid parameters.'});
        });
    }
}