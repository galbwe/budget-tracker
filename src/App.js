import React from 'react';
import { initialState } from './initialState.js';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.getMonthName = this.getMonthName.bind(this);
    this.budgetForMonth = this.budgetForMonth.bind(this);

    //sort monthly budgets by date
    this.state.monthlyBudgets.sort((a, b) => {
      return a.year > b.year ? 1 : a.year < b.year ? -1 : a.month - b.month;
    });

    //sort each month's expenses by day
    this.state.monthlyBudgets.map(budget => {
      let expenses = budget.expenses.slice();
      expenses.sort((a, b) => a.day - b.day);
      budget.expenses = expenses;
      return budget;
    })
  }

  getMonthName(monthNumber) {
    return MONTH_NAMES[monthNumber - 1];
  }

  budgetForMonth(month, year) {
    const budgetMatchesMonthAndYear = budget => (month === budget.month && year === budget.year);
    let monthlyBudget = this.state.monthlyBudgets.find(budgetMatchesMonthAndYear);
    return monthlyBudget.budget.toFixed(2);
  }

  // 2020-01-18 This contains repeated code from this.budgetForMonth. Find a way to refactor.
  expensesForMonth(month, year) {
    const budgetMatchesMonthAndYear = budget => (month === budget.month && year === budget.year);
    let monthlyBudget = this.state.monthlyBudgets.find(budgetMatchesMonthAndYear);
    return monthlyBudget.expenses;
  }

  render() {
    console.log(this.state.monthlyBudgets);
    let budgetForMonth = this.budgetForMonth(this.state.displayMonth, this.state.displayYear);
    let expensesForMonth = this.expensesForMonth(this.state.displayMonth, this.state.displayYear);
    let monthName = this.getMonthName(this.state.displayMonth);
    let yearName = this.state.displayYear;
    let totalExpensesForCurrentMonth = expensesForMonth
      .reduce((agg, next) => {
        return agg + next.amount
      }, 0);
    let budgetLeft = budgetForMonth - totalExpensesForCurrentMonth;
    return (
      <div className="App">
        <h1>{monthName} {yearName}</h1>
        <h1>Target Budget: ${budgetForMonth}</h1>
        <ul>
          {expensesForMonth.map((expense, i) => {
            return (
              <li key={`expense-${i}`}>
                Date: {monthName} {expense.day} {yearName} <br />
                Description: {expense.description} <br />
                Amount: ${expense.amount.toFixed(2)}
              </li>
            )
          })}
        </ul>
        <h1>Total Expenses: ${totalExpensesForCurrentMonth.toFixed(2)} </h1>
        <h1>Budget Left: ${budgetLeft.toFixed(2)}</h1>
      </div>
    );
  }
}

export default App;
