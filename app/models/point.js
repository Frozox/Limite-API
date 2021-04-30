const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    _id: Number,
    _server_id: { type: Schema.Types.ObjectId, ref: 'Serveur' },
    _user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    win: Number,
    loose: Number
});

module.exports = mongoose.model('Point', pointSchema);