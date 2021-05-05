const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    server_id: {type: Schema.Types.ObjectId, ref: 'Serveur'},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    win: Number,
    loose: Number,
},{collection: 'point'});

module.exports = mongoose.model('Point', pointSchema);