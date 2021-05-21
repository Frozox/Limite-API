const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_id: { type: Number, unique: true },
    questionArray: [{ type: String, required: true }]
},{collection: 'question'});

questionSchema.pre("save", function(next){
    if(this.isNew){
        this.constructor.find().sort({question_id: -1}).limit(1).then((last_question) => {
            if(last_question[0]){
                this.question_id = last_question[0].question_id + 1;
            }
            else{
                this.question_id = 1;
            }
            next();
        });
    }
});

module.exports = mongoose.model('Question', questionSchema);