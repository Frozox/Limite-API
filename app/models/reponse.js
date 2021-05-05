const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reponseSchema = new Schema({
    reponse_id: Number,
    texte: String
},{collection: 'reponse'});

module.exports = mongoose.model('Reponse', reponseSchema);