const Reponse = require('../../models/reponse');
const Tools = require('../../models/Tools');

module.exports = {
    create : async (req, res) => {
        await new Reponse(req.body).save().then(() => {
            res.status(200).json({message: 'Reponse added.'});
        }).catch((err) => {
            console.log(err);
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
        var cache_rep = [];

        if(req.query.cache_rep){
            cache_rep = Tools.decodeStringToArray(decodeURI(req.query.cache_rep));
        }

        await Reponse.aggregate([
            { $match: { reponse_id: { $nin: cache_rep } } },
            { $project: { _id: 0, __v: 0 } },
            { $sample: { size: cards_nb * players_nb } },
        ]).then((result) => {
            result.forEach((rep) => { cache_rep.push(rep.reponse_id); });
            res.status(200).json({reponses: result, cache_rep: encodeURI(Tools.encodeArrayToString(cache_rep))});
        });
    },
    findById : async (req, res) => {
        var cache_rep = [];

        if(req.query.cache_rep){
            cache_rep = Tools.decodeStringToArray(decodeURI(req.query.cache_rep));
        }

        await Reponse.findOne({reponse_id: req.params.id}, {_id:0, __v:0})
            .then((result) => {
                if(result){
                    if(!cache_rep.includes(result.reponse_id)){
                        cache_rep.push(result.reponse_id);
                    }

                    var res_json = result.toJSON();
                    res_json.cache_rep = encodeURI(Tools.encodeArrayToString(cache_rep));
                    res.status(200).json(res_json);
                }
                else{
                    res.status(404).json({message: 'Reponse not found.'});
                }
            }).catch((err) => {
                res.status(500).json({message: 'Invalid parameters.'});
        });
    }
}