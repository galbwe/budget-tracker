const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/budget_tracker', { useNewUrlParser: true });

const expenseSchema = new mongoose.Schema({
  month: Number,
  day: Number,
  year: Number,
  amount: Number,
  description: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

const monthlyBudgetSchema = new mongoose.Schema({
  month: Number,
  year: Number,
  budget: Number,
});

const MonthlyBudget = mongoose.model('MonthlyBudget', monthlyBudgetSchema);

module.exports = {
  Expense,
  MonthlyBudget
}
