const express = require('express');
const Question = require('../models/question');

const questionRouter = express.Router();

//GET ALL QUESTIONS
questionRouter
    .route('/questions')
    .get(async function (req, res){
        await Question.find(function (error, questions){
            if(error){
                res.status(500).send(error);
                return;
            }

            res.json(questions);
        }).sort({ _id: 1 });
    });

//GET QUESTION BY ID
questionRouter
    .route('/questions/:questionId')
    .get(async function(req, res){
        var questionId = req.params.questionId;

        await Question.findOne({ _id : questionId }, function (error, question) {
            if(error){
                res.status(500).send(error);
                return;
            }

            res.json(question);
        })
    });

module.exports = questionRouter