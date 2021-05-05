const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serveurSchema = new Schema({
    server_id: { type: String, index: true, required: true, unique: true },
    prefix: { type: String, default: 'l!' },
    nb_cartes: { type: Number, default: 7 },
    nb_win: { type: Number, default: 5 },
    max_players: { type: Number, default: 9 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User'}]
},{collection: 'serveur'});

module.exports = mongoose.model('Serveur', serveurSchema);