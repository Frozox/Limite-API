const Serveur = require('../../models/serveur');
const Point = require('../../models/point');
const User = require('../../models/user');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    create: async (req, res) => {
        //Add Serveur
        await new Serveur(req.body).save().then((result) => {
            res.status(200).json({
                message: MESSAGES.models.serveur.create[200],
                _id: result._id
            });
        }).catch((err) => {
            res.status(500).json({ message: MESSAGES.models.serveur.create[500] });
        })
    },
    delete: async (req, res) => {
        //Rem Serveur
        const server = await Serveur.findByIdAndDelete(req.params.id);

        if (server) {

            //Find Point/User
            await Point.find({ server: req.params.id }).then((points) => {
                points.forEach(point => {

                    //Rem Point to User
                    User.findByIdAndUpdate(point.user, {
                        $pull: { points: point._id }
                    }).exec();
                });
            });

            //Rem Point
            await Point.deleteMany({ server: req.params.id }).exec();

            res.status(200).json({ message: MESSAGES.models.serveur.delete[200] });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.serveur.delete[404] });
        }
    },
    addMember: async (req, res) => {
        //Add User to Serveur
        await Serveur.findByIdAndUpdate(req.params.server_id, {
            $addToSet: { members: req.params.user_id }
        }).then(() => {

            //Add Point to Serveur/User
            Point.create({
                server: req.params.server_id,
                user: req.params.user_id
            }).then((result) => {

                //Set Point to User
                User.findByIdAndUpdate(req.params.user_id, {
                    $addToSet: { points: result._id }
                }).then(() => {
                    res.status(200).json({ message: MESSAGES.models.serveur.addMember[200] });
                });
            }).catch(() => {
                res.status(500).json({ message: MESSAGES.models.serveur.addMember[500] });
            });
        }).catch(() => {
            res.status(404).json({ message: MESSAGES.models.serveur.addMember[404] });
        });
    },
    delMember: async (req, res) => {

        //Rem User to Serveur
        await Serveur.findByIdAndUpdate(req.params.server_id, {
            $pull: { members: req.params.user_id }
        }).then(() => {

            //Rem Point to Serveur/User
            Point.findOneAndDelete({
                server: req.params.server_id, user: req.params.user_id
            }).then((result) => {

                //Rem Point to User
                User.findByIdAndUpdate(req.params.user_id, {
                    $pull: { points: result._id }
                }).then(() => {
                    res.status(200).json({ message: MESSAGES.models.serveur.delMember[200] });
                });
            }).catch(() => {
                res.status(404).json({ message: MESSAGES.models.serveur.delMember[404] });
            });
        }).catch(() => {
            res.status(500).json({ message: MESSAGES.models.serveur.delMember[500] });
        });
    },
    update: async (req, res) => {
        await Serveur.findByIdAndUpdate(req.params.id, req.body).then(() => {
            res.status(200).json({ message: MESSAGES.models.serveur.update[200] });
        })
            .catch((err) => {
                res.status(500).json({ message: MESSAGES.models.serveur.update[500] });
            });
    },
    /*find : async (req, res) => {
        await Serveur.find({},{ __v:0})
            .then((result) => {
                if(result.length == 0){
                    res.status(404).json({message: 'Servers not found.'});
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
        await Serveur.findById(req.params.id, { __v: 0 })
            .then((result) => {
                if (result == null) {
                    res.status(404).json({ message: MESSAGES.models.serveur.findById[404] });
                }
                else {
                    res.status(200).json(result);
                }
            })
            .catch(() => {
                res.status(500).json({ message: MESSAGES.models.serveur.findById[500] });
            });
    },
    count: async (req, res) => {
        await Serveur.countDocuments({}).then((result) => {
            res.status(200).json({ count: result });
        });
    }
}