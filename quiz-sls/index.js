const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const uniqid = require('uniqid');

const QUIZZES_TABLE = process.env.QUIZZES_TABLE;
const QUESTIONS_TABLE = process.env.QUESTIONS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Get Quizzes endpoint
app.get('/quizzes', function (req, res) {
  const params = {
    TableName: QUIZZES_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      res.status(400).json({ error: 'Could not get quiz' });
    }
    if (result.Items) {
      res.json(result.Items);
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  });
});

// Create Quiz endpoint
app.post('/quiz', function (req, res) {
  const quizId = uniqid();
  const name = req.body.name;

  const params = {
    TableName: QUIZZES_TABLE,
    Item: {
      quizId: quizId,
      name: name,
    },
  }

  dynamoDb.put(params, (error) => {
    if (error) {
      res.status(400).json({ error: 'Could not create quiz' });
    }
    res.json({ quizId, name });
  });
});

// Get full list of quiz questions
app.get('/questions/:id', function (req, res) {
  const params = {
    TableName: QUESTIONS_TABLE,
    Key: {
      quizId: req.params.id
    }
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      res.status(400).json({ error: 'Could not get quiz' });
    }
    if (result.Items) {
      res.json(result.Items);
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  });
});

// Add questions for quiz category
app.post('/add-question', function (req, res) {
  const id = uniqid();
  const { question, options, weight, answer, quizId } = req.body;

  const params = {
    TableName: QUESTIONS_TABLE,
    Item: {
      id: id,
      question: question,
      options: options,
      weight: weight,
      answer: answer,
      quizId: quizId
    },
  }

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create quiz' });
    }
    res.json({ id, question, options, weight, answer, quizId });
  });
});

module.exports.handler = serverless(app);