const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_id: Number,
    texte: String
},{collection: 'question'});

module.exports = mongoose.model('Question', questionSchema);