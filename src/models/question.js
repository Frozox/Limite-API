const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    _id: Number,
    texte: String
});

module.exports = mongoose.model('Question', questionSchema);