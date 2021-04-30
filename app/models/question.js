const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    _id: Number,
    texte: String/*,
    reponses: [{ type: Schema.Types.ObjectId, ref: 'Reponse' }]*/
});

module.exports = mongoose.model('Question', questionSchema);