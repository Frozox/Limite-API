const Serveur = require('../../models/serveur');
const Point = require('../../models/point');
const User = require('../../models/user');

module.exports = {
    create : async (req, res) => {
        //Add Serveur
        await new Serveur(req.body).save().then(() => {
            res.status(200).json({message: 'Server added.'});
        }).catch((err) => {
            res.status(500).json({message: 'Server already exist or invalid parameters.'});
        })
    },
    delete : async (req, res) => {
        //Rem Serveur
        const server = await Serveur.findByIdAndDelete(req.params.id);
        
        if(server){

            //Find Point/User
            await Point.find({server: req.params.id}).then((points) => {
                points.forEach(point => {

                    //Rem Point to User
                    User.findByIdAndUpdate(point.user, {
                        $pull: {points: point._id}
                    }).exec();
                });
            });

            //Rem Point
            await Point.deleteMany({server: req.params.id}).exec();

            res.status(200).json({message: 'Server deleted.'});
        }
        else{
            res.status(404).json({message: 'Server does not exist or invalid parameters.'});
        }
    },
    addMember : async (req, res) => {
        //Add User to Serveur
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

        //Rem User to Serveur
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
    },
    findById : async (req, res) => {
        await Serveur.findById(req.params.id)
            .then((result) => {
                if(result == null){
                    res.status(404).json({message: 'Server not found.'});
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