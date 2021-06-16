const Serveur = require('../../models/serveur');
const Point = require('../../models/point');
const User = require('../../models/user');
const { MESSAGES } = require('../../util/constants');

module.exports = {
    create: async (req, res) => {
        //Add Serveur
        await new Serveur(req.body).save().then(() => {
            res.status(200).json({ message: MESSAGES.models.serveur.create[200] });
        }).catch(() => {
            res.status(500).json({ message: MESSAGES.models.serveur.create[500] });
        })
    },
    delete: async (req, res) => {
        //Rem Serveur
        const server = await Serveur.findOneAndDelete({ server_id: req.params.id })

        if (server) {

            //Find Point/User
            await Point.find({ server: server._id }).then((points) => {
                points.forEach(point => {

                    //Rem Point to User
                    User.findByIdAndUpdate(point.user, {
                        $pull: { points: point._id }
                    }).exec();
                });
            });

            //Rem Point
            await Point.deleteMany({ server: server._id }).exec();

            res.status(200).json({ message: MESSAGES.models.serveur.delete[200] });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.serveur.delete[404] });
        }
    },
    createIfNotExists: async (req, res) => {
        await Serveur.find({ server_id: { $in: req.body } }).distinct('server_id').then((result) => {
            //Récupérer les serveurs à ajouter 
            const serveursToAdd = req.body.filter(x => !result.includes(x)).map(srv => JSON.parse(`{ "server_id": "${srv}" }`));
            if (serveursToAdd.length > 0) {
                //Insérer les serveurs manquants
                Serveur.insertMany(serveursToAdd);
                res.status(200).json({ message: `${serveursToAdd.length} ${MESSAGES.models.serveur.createIfNotExists[200]}` });
            }
            else {
                res.status(404).json({ message: MESSAGES.models.serveur.createIfNotExists[404] });
            }
        })
    },
    deleteIfNotExists: async (req, res) => {
        //Récupérer les serveurs à supprimer
        await Serveur.find({ server_id: { $nin: req.body } }, { _id: 1 }).then((result) => {
            if (result.length > 0) {

                //Supprimer les points des utlisateurs liés au serveur
                result.forEach((serveurToDelete) => {
                    Point.find({ server: serveurToDelete._id }).then((points) => {
                        points.forEach(point => {

                            //Rem Point to User
                            User.findByIdAndUpdate(point.user, {
                                $pull: { points: point._id }
                            }).exec();
                        });
                    });
                    Point.deleteMany({ server: serveurToDelete._id }).exec();
                });
                Serveur.deleteMany({ _id: { $in: result.map(srv => srv._id) } }).exec();
                res.status(200).json({ message: `${result.length} ${MESSAGES.models.serveur.deleteIfNotExists[200]}` });
            }
            else {
                res.status(404).json({ message: MESSAGES.models.serveur.deleteIfNotExists[404] });
            }
        });
    },
    addMember: async (req, res) => {
        const server = await Serveur.findOne({ server_id: req.body.server_id }, { _id: 1 });
        const user = await User.findOne({ user_id: req.body.user_id }, { _id: 1 });

        if (server && user) {
            //Add User to Serveur
            await Serveur.findByIdAndUpdate(server, {
                $addToSet: { members: user._id }
            }).then(() => {

                //Add Point to Serveur/User
                Point.create({
                    server: server._id,
                    user: user._id
                }).then((result) => {

                    //Set Point to User
                    User.findByIdAndUpdate(user._id, {
                        $addToSet: { points: result._id }
                    }).then(() => {
                        res.status(200).json({ message: MESSAGES.models.serveur.addMember[200] });
                    });
                }).catch(() => {
                    res.status(500).json({ message: MESSAGES.models.serveur.addMember[500] });
                });
            });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.serveur.addMember[404] });
        }
    },
    delMember: async (req, res) => {
        const server = await Serveur.findOne({ server_id: req.params.server_id }, { _id: 1 });
        const user = await User.findOne({ user_id: req.params.user_id }, { _id: 1 });

        if (server && user) {
            //Rem User to Serveur
            await Serveur.findByIdAndUpdate(server, {
                $pull: { members: user._id }
            }).then(() => {

                //Rem Point to Serveur/User
                Point.findOneAndDelete({
                    server: server._id, user: user._id
                }).then((result) => {
                    if (result) {
                        //Rem Point to User
                        User.findByIdAndUpdate(user, {
                            $pull: { points: result._id }
                        }).then(() => {
                            res.status(200).json({ message: MESSAGES.models.serveur.delMember[200] });
                        })
                    }
                    else {
                        res.status(500).json({ message: MESSAGES.models.serveur.delMember[500] });
                    }
                });
            });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.serveur.delMember[404] });
        }
    },
    update: async (req, res) => {
        const server = await Serveur.findOne({ server_id: req.params.id }, { _id: 1 });

        if (server) {
            await Serveur.findByIdAndUpdate(server._id, req.body).then(() => {
                res.status(200).json({ message: MESSAGES.models.serveur.update[200] });
            })
                .catch(() => {
                    res.status(500).json({ message: MESSAGES.models.serveur.update[500] });
                });
        }
        else {
            res.status(404).json({ message: MESSAGES.models.serveur.update[404] });
        }
    },
    getAllPrefix: async (req, res) => {
        await Serveur.find({}, { server_id: 1, prefix: 1, _id: 0 }).then((result) => {
            const dictResult = result.map(r => JSON.parse(`{"key": "${r.server_id}", "val": "${r.prefix}"}`));
            res.status(200).json(dictResult);
        });
    },
    findById: async (req, res) => {
        await Serveur.findOne({ server_id: req.params.id }, { _id: 0, __v: 0 })
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