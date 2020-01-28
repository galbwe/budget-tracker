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
    res.json(budgets);
  })
})

api.post('/api/v1/expenses', jsonParser, (req, res) => {
  let expense = new models.Expense(req.body);
  expense.save();
  let data = req.body;
  data.id = expense._id;
  res.send(data);
})

api.post('/api/v1/monthly-budgets', jsonParser, (req, res) => {
  let budget = new models.MonthlyBudget(req.body);
  budget.save();
  let data = req.body;
  data.id = budget._id;
  res.send(data);
})

api.get('/api/v1/expenses/:id', (req, res) => {
  models.Expense.findById(req.params.id, (err, expense) => {
    res.json(expense);
  })
});

api.get('/api/v1/monthly-budgets/:id', (req, res) => {
  models.MonthlyBudget.findById(req.params.id, (err, budget) => {
    res.json(budget);
  })
});

api.delete('/api/v1/expenses/:id', (req, res) => {
  models.Expense.findById(req.params.id, (err, expense) => {
    expense.deleteOne();
    res.json(expense);
  })
});

api.delete('/api/v1/monthly-budgets/:id', (req, res) => {
  models.MonthlyBudget.findById(req.params.id, (err, monthlyBudget) => {
    monthlyBudget.deleteOne();
    res.json(monthlyBudget);
  })
});

api.put('/api/v1/expenses/:id', jsonParser, (req, res) => {
  models.Expense.findById(req.params.id, (err, expense) => {
    expense._id = req.params.id;
    expense.day = req.body.day;
    expense.year = req.body.year;
    expense.month = req.body.month;
    expense.amount = req.body.amount;
    expense.description = req.body.description;
    expense.save();
    res.json(expense);
  })
});

api.put('/api/v1/monthly-budgets/:id', jsonParser, (req, res) => {
  models.MontlyBudget.findById(req.params.id, (err, budget) => {
    budget._id = req.params.id;
    budget.year = req.body.year;
    budget.month = req.body.month;
    budget.budget = req.body.budget;
    budget.save();
    res.json(budget);
  })
});


api.listen(port, () => console.log('API listening on port ' + port));
