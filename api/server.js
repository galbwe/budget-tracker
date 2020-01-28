const express = require('express');
const api = express();
const models = require('./models.js');
console.log(models);
const port = 8080;

api.get('/test', (req, res) => {
  res.send('It works!');
});

api.get('/api/v1/expenses', (req, res) => {
  models.Expense.find((err, expenses) => {
    res.send(JSON.stringify(expenses));
  })
})

api.get('/api/v1/monthly-budgets', (req, res) => {
  models.MothlyBudget.find((err, budgets) => {
    res.send(JSON.stringify(budgets));
  })
})

api.listen(port, () => console.log('API listening on port ' + port));
