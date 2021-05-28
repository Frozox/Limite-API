const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_id: { type: Number, unique: true },
    questionArray: { type: [String], required: true, validate: [isValidQuestionArray] }
},{collection: 'question'});

function isValidQuestionArray(arr){
    var nbtext = 0;
    var nbrep = 0;
    arr.forEach((val) => { if(!val){ nbrep++; } else{ nbtext++; }});
    if(nbtext >= 1 && nbrep >= 1){ return true }
    return false;
}

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