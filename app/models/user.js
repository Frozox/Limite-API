const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: String, index: true, required: true, unique: true },
    nom: { type: String, required: true},
    servers: [{ type: Schema.Types.ObjectId, ref: 'Serveur'}]
},{collection: 'user'});

module.exports = mongoose.model('User', userSchema);