const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    points: [{ type: Schema.Types.ObjectId, ref: 'Point', unique: true }]
},{collection: 'user'});

module.exports = mongoose.model('User', userSchema);