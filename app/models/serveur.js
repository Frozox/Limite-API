const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conf = require('../../config.json');

const serveurSchema = new Schema({
    server_id: { type: String, required: true, unique: true },
    prefix: { type: String, default: conf.DEFAULT_PREFIX },
    deck_cards: { type: Number, default: conf.DEFAULT_DECK },
    rounds_win: { type: Number, default: conf.DEFAULT_ROUNDS_TO_WIN },
    max_pl: { type: Number, default: conf.DEFAULT_MAX_PLAYERS },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{collection: 'serveur'});

module.exports = mongoose.model('Serveur', serveurSchema);