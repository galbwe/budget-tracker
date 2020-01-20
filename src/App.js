import React from 'react';
// import { initialState } from './initialState.js';
import './css/index.css';
import './css/month-display.css'
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
    this.state = {
      newExpense: {
        day: 1,
        description: '',
        amount: 0,
      },
      displayMonth: 1,
      displayYear: 2020,
      monthlyBudgets: [
        {
          month: 1,
          year: 2020,
          budget: 50000, //should be rounded to 2 decimal places
          expenses: [],
        }
      ]
    }

    this.getMonthName = this.getMonthName.bind(this);
    this.budgetForMonth = this.budgetForMonth.bind(this);
    this.getDisplayMonthIndex = this.getDisplayMonthIndex.bind(this);
    this.displayNextMonth = this.displayNextMonth.bind(this);
    this.displayPreviousMonth = this.displayPreviousMonth.bind(this);
    this.addNewExpense = this.addNewExpense.bind(this);
    this.updateNewExpenseDay = this.updateNewExpenseDay.bind(this);
    this.updateNewExpenseDescription = this.updateNewExpenseDescription.bind(this);
    this.updateNewExpenseAmount = this.updateNewExpenseAmount.bind(this);
    this.removeExpense = this.removeExpense.bind(this);

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

  addNewExpense(ev) {
    ev.preventDefault();
    let i = this.getDisplayMonthIndex(this.state.displayMonth, this.state.displayYear);
    this.setState((state, props) => {
      let budget = state.monthlyBudgets[i];
      budget.expenses.push({
        amount: parseFloat(state.newExpense.amount),
        day: state.newExpense.day,
        description: state.newExpense.description,
      });
      budget.expenses.sort((a, b) => a.day - b.day);
      state.monthlyBudgets[i] = budget;
      state.newExpense = {
        day: 1,
        description: '',
        amount: '',
      }
      return state;
    });
  }

  updateNewExpenseDay(event) {
    event.preventDefault();
    let day = parseInt(event.target.options[event.target.selectedIndex].text);
    this.setState((state, props) => {
      state.newExpense.day = day;
      return state;
    })
  }

  updateNewExpenseAmount(event) {
    event.preventDefault();
    let amount = event.target.value;
    this.setState((state, props) => {
      state.newExpense.amount = amount;
      return state;
    })
  }

  updateNewExpenseDescription(event) {
    event.preventDefault();
    let description = event.target.value;
    this.setState((state, props) => {
      state.newExpense.description = description;
      return state;
    })
  }

  removeExpense(i) {
    return event => {
      event.preventDefault();
      let j = this.getDisplayMonthIndex(this.state.displayMonth, this.state.displayYear);
      this.setState((state, props) => {
        let budget = state.monthlyBudgets[j];
        budget.expenses = [...budget.expenses.slice(0,i), ...budget.expenses.slice(i+1)];
        state.monthlyBudgets[j] = budget;
        return state;
      })
    }
  }

  render() {
    let budgetForMonth = this.budgetForMonth(this.state.displayMonth, this.state.displayYear);
    let expensesForMonth = this.expensesForMonth(this.state.displayMonth, this.state.displayYear);
    let monthName = this.getMonthName(this.state.displayMonth);
    let yearName = this.state.displayYear;
    let totalExpensesForCurrentMonth = expensesForMonth
      .reduce((agg, next) => {
        return agg + next.amount
      }, 0);
    let budgetLeft = budgetForMonth - totalExpensesForCurrentMonth;
    // oversimplified. Will need to modifiy later to account for number of days
    // in each month
    let daysInMonth = [];
    for (let i = 1; i < 32; i++) {
      daysInMonth.push(i);
    }

    return (
      <div className="App container">
        <div className="month-display">
          <button className="btn btn-primary" onClick={this.displayPreviousMonth}>Last Month</button>
          <h1 className="header-light">{monthName} {yearName}</h1>
          <button className="btn btn-primary" onClick={this.displayNextMonth}>Next Month</button>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <td>Target Budget</td>
              <td>${budgetForMonth}</td>
            </tr>
            <tr>
              <td>Total Expenses</td>
              <td>${totalExpensesForCurrentMonth.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Budget Left</td>
              <td>${budgetLeft.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <table className="table">
          <thead>
            <tr>
              <td>Date</td>
              <td>Description</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
          {expensesForMonth.map((expense, i) => {
            return (
              <tr key={`expense-${i}`}>
                <td>{monthName} {expense.day} {yearName}</td>
                <td>{expense.description} </td>
                <td>${expense.amount.toFixed(2)}</td>
                <td><button className="btn btn-primary" onClick={this.removeExpense(i)}>-</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <form className="new-expense-form">
          <select onChange={this.updateNewExpenseDay}>
            {daysInMonth.map(i => {
              return <option key={`day-${i}`} value>{i}</option>
            })}
          </select>
          <input type="text" value={this.state.newExpense.description} placeholder="Describe Expense" onChange={this.updateNewExpenseDescription}/>
          <input type="text" value={this.state.newExpense.amount} placeholder="$9999.99" onChange={this.updateNewExpenseAmount}/>
          <button className="btn btn-primary" onClick={this.addNewExpense}>+</button>
        </form>


      </div>
    );
  }
}

export default App;
