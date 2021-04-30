const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Number,
    nom: String,
});

module.exports = mongoose.model('User', userSchema);