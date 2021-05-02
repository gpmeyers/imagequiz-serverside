require('dotenv').config();
const { Pool } = require('pg');

let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.username;
let password = process.env.password;

let connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl: {rejectUnauthorized: false}
}

const pool = new Pool(connection);

let saveScore = (customer, quiz, score) => {
    return pool.query('insert into imagequiz.scores(customerid, quizid, score) values ($1, $2, $3)', [customer, quiz, score])
    .then(() => console.log('score was saved successfully'))
    .catch(e => console.log(e));
}

let getQuestions = () => {
    let questions = [];
    for (let i = 0; i < flowers.length; i++) {
        let sql = 'select picture from imagequiz.flowers f inner join imagequiz.questions q on (f.id = q.flowerid) where q.id=($s1);';

        let picture = pool.query(sql, [i])
        .then(result => result.rows)
        .catch(e => console.log(e));

        sql = 'select choice1, choice2, choice3 from imagequiz.questions where id=($s1)';

        let choices = pool.query(sql, [i])
        .then(result => result.rows)
        .catch(e => console.log(e));

        sql = 'select answer from imagequiz.questions where id=($s1)';

        let answer = pool.query(sql, [i])
        .then(result => result.rows)
        .catch(e => console.log(e));

        let question = {
            picture: picture,
            choices: choices,
            answer: answer
        };
        questions.push(question);
    }

    return questions;
}

let getQuizzes = () => {
    let quizzes = [];
    let questionIndex = 0;
    let questions = getQuestions();
    for (let i = 0; i < questions.length; i++) {
        questionIndex = i;
        if (questionIndex > (questions.length - 7)) {
            questionIndex = i - 5;
        }
        let quiz = [
            questions[questionIndex],
            questions[questionIndex + 1],
            questions[questionIndex + 2],
            questions[questionIndex + 3],
            questions[questionIndex + 4],
            questions[questionIndex + 5]
        ];
        quizzes.push(quiz);
    }
    return quizzes;
}

let getQuiz = (id) => {
    let questionIndex = 0;
    let questions = getQuestions();

    questionIndex = id;
    
    if (questionIndex > (questions.length - 7)) {
        questionIndex = i - 5;
    }

    return [
        questions[questionIndex],
        questions[questionIndex + 1],
        questions[questionIndex + 2],
        questions[questionIndex + 3],
        questions[questionIndex + 4],
        questions[questionIndex + 5]
    ];
}

module.exports = { saveScore, getQuizzes, getQuiz };