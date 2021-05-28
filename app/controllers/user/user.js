const User = require('../../models/user');
const Point = require('../../models/point')
const Serveur = require('../../models/serveur');

module.exports = {
    create : async (req, res) => {
        await new User(req.body).save().then(() => {
            res.status(200).json({message: 'User added.'});
        }).catch(() => {
            res.status(500).json({message: 'User already exist or invalid parameters.'});
        })
    },
    delete : async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);

        if(user) {

            //Find Point/Serveur
            await Point.find({user: req.params.id}).then((points) => {
                points.forEach(point => {

                    //Rem User to Serveur
                    Serveur.findByIdAndUpdate(point.server, {
                        $pull: {members: req.params.id}
                    }).exec();
                })
            });

            //Rem Point
            await Point.deleteMany({user: req.params.id}).exec();

            res.status(200).json({message: 'User deleted.'});
        }
        else{
            res.status(404).json({message: 'User does not exist or invalid parameters.'});
        }
    },
    update : async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body).then(() => {
            res.status(500).json({message: 'User updated.'});
        })
        .catch((err) => {
            res.status(500).json({message: 'Update failed. Invalid parameters.'});
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
    findById : async (req, res) => {
        await User.findById(req.params.id, {__v:0})
            .then((result) => {
                if(result == null){
                    res.status(404).json({message: 'User not found.'});
                }
                else{
                    res.status(200).json(result);
                }
            })
            .catch(() => {
                res.status(500).json({message: 'Invalid parameters.'});
        });
    },
    count : async (req, res) => {
        await User.countDocuments({}).then((result) => {
            res.status(200).json({count: result});
        });
    }
}