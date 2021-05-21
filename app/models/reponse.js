const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reponseSchema = new Schema({
    reponse_id: { type: Number, unique: true },
    reponse: { type: String, required: true }
},{collection: 'reponse'});

reponseSchema.pre("save", function(next){
    if(this.isNew){
        this.constructor.find().sort({reponse_id: -1}).limit(1).then((last_rep) => {
            if(last_rep[0]){
                this.reponse_id = last_rep[0].reponse_id + 1;
            }
            else{
                this.reponse_id = 1;
            }
            next();
        });
    }
});

module.exports = mongoose.model('Reponse', reponseSchema);