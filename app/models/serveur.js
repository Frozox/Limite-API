const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serveurSchema = new Schema({
    _id: Number,
    prefix: String,
    nb_cartes: Number,
    nb_win: Number,
    max_players: Number
});

module.exports = mongoose.model('Serveur', serveurSchema);