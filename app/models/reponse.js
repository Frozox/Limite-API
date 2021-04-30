const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reponseSchema = new Schema({
    _id: Number,
    texte: String
});

module.exports = mongoose.model('Reponse', reponseSchema);