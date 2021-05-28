const Reponse = require('../../models/reponse');
const Tools = require('../../models/Tools');

module.exports = {
    create : async (req, res) => {
        await new Reponse(req.body).save().then(() => {
            res.status(200).json({message: 'Reponse added.'});
        }).catch((err) => {
            res.status(500).json({message: 'Invalid parameters.'});
        })
    }, 
    delete : async (req, res) => {
        const reponse = await Reponse.findOneAndDelete({reponse_id: req.params.id});

        if(reponse){
            res.status(200).json({message: 'Reponse deleted.'});
        }
        else{
            res.status(404).json({message: 'Reponse does not exist or invalid parameters.'});
        }
    },
    findRandomly : async (req, res) => {
        const cards_nb = Tools.getCards_nb(parseInt(req.query.cards_nb));
        const players_nb = Tools.getPlayers_nb(parseInt(req.query.players_nb));
        var cache = [];

        if(req.query.cache){
            cache = Tools.decodeStringToArray(decodeURI(req.query.cache));
        }

        await Reponse.aggregate([
            { $match: { reponse_id: { $nin: cache } } },
            { $project: { _id: 0, __v: 0 } },
            { $sample: { size: cards_nb * players_nb } },
        ]).then((result) => {
            result.forEach((rep) => { cache.push(rep.reponse_id); });
            res.status(200).json({reponses: result, cache: encodeURI(Tools.encodeArrayToString(cache))});
        });
    },
    findById : async (req, res) => {
        var cache = [];

        if(req.query.cache){
            cache = Tools.decodeStringToArray(decodeURI(req.query.cache));
        }

        await Reponse.findOne({reponse_id: req.params.id}, {_id:0, __v:0})
            .then((result) => {
                if(result){
                    if(!cache.includes(result.reponse_id)){
                        cache.push(result.reponse_id);
                    }

                    var res_json = result.toJSON();
                    res_json.cache = encodeURI(Tools.encodeArrayToString(cache));
                    res.status(200).json(res_json);
                }
                else{
                    res.status(404).json({message: 'Reponse not found.'});
                }
            }).catch((err) => {
                res.status(500).json({message: 'Invalid parameters.'});
        });
    },
    count : async (req, res) => {
        await Reponse.countDocuments({}).then((result) => {
            res.status(200).json({count: result});
        });
    }
}