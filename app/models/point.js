const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    win: { type: Number, min: 0, default: 0 },
    server: { type: Schema.Types.ObjectId, ref: 'Serveur'},
    user: { type: Schema.Types.ObjectId, ref: 'User'}
},{collection: 'point'});

pointSchema.index({server: 1, user: 1}, {unique: true});

module.exports = mongoose.model('Point', pointSchema);