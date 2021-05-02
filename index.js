// dependencies
const express = require('express');
const cors = require('cors');
const data = require('./data');
const db = require('./db');

// create the server
const app = express();
const port = process.env.PORT || 4000;

// use cors
var corsOptions = {
    origin: 'https://gpmeyers.github.io',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// parse json
app.use(express.json());

// data
let scores = [];

app.use(cors(corsOptions));

app.get('/quizzes', (req, res) => {
    res.json(db.getQuizzes());
});

app.get('/quizzes/:id', (req, res) => {
    let id = req.params.id;
    let quiz = db.getQuiz(id);
    res.json(quiz);
});

app.post('/score', (req, res) => {
    let customer = req.body.customer;
    let quiz = req.body.quiz;
    let score = req.body.score;
    db.saveScore(customer, quiz, score);
    res.send(`The score ${score} was added successfully.`);
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));