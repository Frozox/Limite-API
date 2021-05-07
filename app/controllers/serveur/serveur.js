const Serveur = require('../../models/serveur');
const Point = require('../../models/point');
const User = require('../../models/user');

module.exports = {
    create : async (req, res) => {
        await new Serveur(req.body).save().then((result) => {
            res.status(200).json({message: 'Server added.'});
        }).catch((err) => {
            res.status(500).json({message: 'Server already exist or invalid parameters.'});
        })
    },
    delete : async (req, res) => {
        //Rem Serveur
        await Serveur.findById(req.params.id).then(() => {
            
            //Rem Point
            Point.find({server: req.params.id}).then((result) => {
                res.status(200).json(result);
            })

            //Rem Members Points
            /*User.findById({$in: server.members}).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(500).send(err);
            })*/
        }).catch((err) => {
            res.status(500).send(err);
        });
    },
    addMember : async (req, res) => {
        //Add Member to Serveur
        await Serveur.findByIdAndUpdate(req.params.server_id, {
            $addToSet: {members: req.params.user_id}
        }).then(() => {

            //Add Point to Serveur/User
            Point.create({
                server: req.params.server_id,
                user: req.params.user_id
            }).then((result) => {
                
                //Set Point to User
                User.findByIdAndUpdate(req.params.user_id, {
                    $addToSet: {points: result._id}
                }).then(() => {
                    res.status(200).json({message: 'Member added to Server.'});
                });
            }).catch(() => {
                res.status(500).json({message: 'Member already in Server.'});
            });
        }).catch(() => {
            res.status(500).json({message: 'Invalid Server or User id.'});
        });
    },
    delMember : async (req, res) => {

        //Rem Member to Serveur
        await Serveur.findByIdAndUpdate(req.params.server_id, {
            $pull: {members: req.params.user_id}
        }).then(() => {

            //Rem Point to Serveur/User
            Point.findOneAndDelete({
                server: req.params.server_id, user: req.params.user_id
            }).then((result) => {
                
                //Rem Point to User
                User.findByIdAndUpdate(req.params.user_id, {
                    $pull: {points: result._id}
                }).then(() => {
                    res.status(200).json({message: 'Member removed from Server.'});
                });
            }).catch(() => {
                res.status(404).json({message: 'Member not in Server.'});
            });
        }).catch(() => {
            res.status(500).json({message: 'Invalid Server or User id.'});
        });
    },
    find : async (req, res) => {
        await Serveur.find()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).send('Servers not found, invalid parameters.');
        });
    },
    findById : async (req, res) => {
        await Serveur.findById(req.params.id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({message: 'Server not found, invalid parameters.'});
        });
    }
}