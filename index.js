const { response } = require('express')
const express = require('express')
const app = express()
const api = require('./api.json')

app.get('/questions/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const question = api.questions.find(question => question.id === id)
    res.status(200).json(question)
})

app.get('/reponses/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const reponse = api.reponses.find(response => response.id === id)
    res.status(200).json(reponse)
})

app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
})
