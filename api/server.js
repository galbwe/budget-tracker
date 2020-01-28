const express = require('express');
const bodyParser = require('body-parser');
const api = express();
const models = require('./models.js');
console.log(models);
const port = 8080;

const jsonParser = bodyParser.json();

api.get('/test', (req, res) => {
  res.send('It works!');
});

api.get('/api/v1/expenses', (req, res) => {
  models.Expense.find((err, expenses) => {
    res.json(expenses);
  })
})

api.get('/api/v1/monthly-budgets', (req, res) => {
  models.MonthlyBudget.find((err, budgets) => {
    res.json(expenses);
  })
})

api.post('/api/v1/expenses', jsonParser, (req, res) => {
  expense = new models.Expense(req.body);
  expense.save();
  let data = req.body;
  data.id = expense._id;
  res.send(data);
})

api.post('/api/v1/monthly-budgets', jsonParser, (req, res) => {
  budget = new models.MonthlyBudget(req.body);
  budget.save();
  let data = req.body;
  data.id = budget._id;
  res.send(data);
})


api.listen(port, () => console.log('API listening on port ' + port));
