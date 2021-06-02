const User = require('../../models/user');
const Point = require('../../models/point')
const Serveur = require('../../models/serveur');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    create: async (req, res) => {
        await new User(req.body).save().then((result) => {
            res.status(200).json({
                message: MESSAGES.models.user.create[200],
                _id: result._id
            });
        }).catch(() => {
            res.status(500).json({ message: MESSAGES.models.user.create[500] });
        })
    },
    delete: async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);

        if (user) {

            //Find Point/Serveur
            await Point.find({ user: req.params.id }).then((points) => {
                points.forEach(point => {

                    //Rem User to Serveur
                    Serveur.findByIdAndUpdate(point.server, {
                        $pull: { members: req.params.id }
                    }).exec();
                })
            });

            //Rem Point
            await Point.deleteMany({ user: req.params.id }).exec();

            res.status(200).json({ message: MESSAGES.models.user.delete[200] });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.user.delete[404] });
        }
    },
    update: async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body).then(() => {
            res.status(200).json({ message: MESSAGES.models.user.update[200] });
        })
            .catch((err) => {
                res.status(500).json({ message: MESSAGES.models.user.update[500] });
            });
    },
    /*find : async (req, res) => {
        await User.find({},{__v:0})
            .then((result) => {
                if(result.length == 0){
                    res.status(404).json({message: 'Users not found.'});
                }
                else{
                    res.status(200).json(result);
                }
            })
            .catch(() => {
                res.status(500).json({message: 'Invalid parameters.'});
        });
    },*/
    findById: async (req, res) => {
        await User.findById(req.params.id, { __v: 0 })
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