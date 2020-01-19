import React from 'react';
import { initialState } from './initialState.js';
import './css/index.css';
import './css/table.css';

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
    this.getDisplayMonthIndex = this.getDisplayMonthIndex.bind(this);
    this.displayNextMonth = this.displayNextMonth.bind(this);
    this.displayPreviousMonth = this.displayPreviousMonth.bind(this);

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

  getDisplayMonthIndex(month, year) {
    const budgetMatchesMonthAndYear = budget => (month === budget.month && year === budget.year);
    return this.state.monthlyBudgets.findIndex(budgetMatchesMonthAndYear);
  }

  displayNextMonth() {
    // get display month index
    let i = this.getDisplayMonthIndex(this.state.displayMonth, this.state.displayYear);
    // check if index is last in the array of montly budgets
    if (i === this.state.monthlyBudgets.length - 1) {
      return;
    }
    // if not, get month and year of the next montly budget in the list
    let nextBudget = this.state.monthlyBudgets[i+1];
    // set state so that the next month and yera show
    this.setState({
      displayMonth: nextBudget.month,
      displayYear: nextBudget.year,
    });
  }

  displayPreviousMonth() {
    // get display month index
    let i = this.getDisplayMonthIndex(this.state.displayMonth, this.state.displayYear);
    // check if index is first in the array of montly budgets
    if (i === 0) {
      return;
    }
    // if not, get month and year of the previous montly budget in the list
    let prevBudget = this.state.monthlyBudgets[i-1];
    // set state so that the previous month and yera show
    this.setState({
      displayMonth: prevBudget.month,
      displayYear: prevBudget.year,
    });
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
      <div className="App container">
        <h1>{monthName} {yearName}</h1>
        <div class="button-display">
          <button onClick={this.displayPreviousMonth}>Last Month</button>
          <button onClick={this.displayNextMonth}>Next Month</button>
        </div>
        <h1>Target Budget: ${budgetForMonth}</h1>
        <table className="table">
          <thead>
            <td>Date</td>
            <td>Description</td>
            <td>Amount</td>
          </thead>
          <tbody>
          {expensesForMonth.map((expense, i) => {
            return (
              <tr key={`expense-${i}`}>
                <td>{monthName} {expense.day} {yearName}</td>
                <td>{expense.description} </td>
                <td>${expense.amount.toFixed(2)}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <h1>Total Expenses: ${totalExpensesForCurrentMonth.toFixed(2)} </h1>
        <h1>Budget Left: ${budgetLeft.toFixed(2)}</h1>
      </div>
    );
  }
}

export default App;
