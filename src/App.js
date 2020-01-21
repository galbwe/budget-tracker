import React from 'react';
import { demoState } from './demoState.js';
import './css/index.css';
import './css/month-display.css';
import './css/table.css';
import './css/add-expense-form.css';
import './css/change-budget-form.css'

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
  'December',
]

class App extends React.Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    if (props.useDemoState) {
      this.state = demoState;
    } else {
      this.state = {
        newExpense: {
          day: 1,
          description: '',
          amount: '',
        },
        displayMonth: currentMonth,
        displayYear: currentYear,
        newBudgetAmount: "",
        monthlyBudgets: [
          {
            month: currentMonth,
            year: currentYear,
            budget: 50000, //should be rounded to 2 decimal places
            expenses: [],
          }
        ]
      }
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
    this.editCurrentTargetBudget = this.editCurrentTargetBudget.bind(this);
    this.renderTargetBudget = this.renderTargetBudget.bind(this);
    this.toggleEditBudgetField = this.toggleEditBudgetField.bind(this);
    this.updateNewBudgetAmount = this.updateNewBudgetAmount.bind(this);
    this.handleNewBudgetSubmit = this.handleNewBudgetSubmit.bind(this);
    this.handleNewBudgetBack = this.handleNewBudgetBack.bind(this);

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
    let nextBudget;
    // check if index is last in the array of montly budgets
    if (i === this.state.monthlyBudgets.length - 1) {
      //create a new monthlyBudget
      nextBudget = {
        month: this.state.displayMonth === 12 ? 1 : this.state.displayMonth + 1,
        year: this.state.displayMonth === 12 ? this.state.displayYear + 1 : this.state.displayYear,
        budget: this.state.monthlyBudgets[i].budget,
        expenses: []
      }
      this.setState((state, props) => {
        state.monthlyBudgets.push(nextBudget);
        return state;
      })
    } else {
      // if not, get month and year of the next montly budget in the list
      nextBudget = this.state.monthlyBudgets[i+1];
    }

    // set state so that the next month and year show
    this.setState({
      displayMonth: nextBudget.month,
      displayYear: nextBudget.year,
    });
  }

  displayPreviousMonth() {
    // get display month index
    let i = this.getDisplayMonthIndex(this.state.displayMonth, this.state.displayYear);
    let prevBudget;
    // check if index is first in the array of montly budgets
    if (i === 0) {
      //create a new monthlyBudget
     prevBudget = {
        month: this.state.displayMonth === 1 ? 12 : this.state.displayMonth - 1,
        year: this.state.displayMonth === 1 ? this.state.displayYear - 1 : this.state.displayYear,
        budget: this.state.monthlyBudgets[i].budget,
        expenses: []
      }
      this.setState((state, props) => {
        state.monthlyBudgets.unshift(prevBudget);
        return state;
      })
    } else {
      // if not, get month and year of the previous montly budget in the list
      prevBudget = this.state.monthlyBudgets[i-1];
    }

    // set state so that the previous month and year show
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
      let amount = state.newExpense.amount;
      amount = amount.replace(/[^.0-9]/g, ''); // remove all non digit characters
      let numberDecimals = amount.split('.').length - 1
      if (typeof numberDecimals === 'undefined' || numberDecimals > 1) {
        return;
      }
      if (amount.length === 0) {
        return; // in case all characters were removed, or an empty string was entered
      }
      budget.expenses.push({
        amount: parseFloat(amount),
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

  editCurrentTargetBudget(newAmount) {
    let month = this.state.displayMonth;
    let year = this.state.displayYear;
    let i = this.getDisplayMonthIndex(month, year);
    this.setState((state, props) => {
      let budget = state.monthlyBudgets[i];
      budget.budget = newAmount;
      state.monthlyBudgets[i] = budget;
      return state;
    })
  }

  toggleEditBudgetField() {
    this.setState({
      showEditBudgetField: !this.state.showEditBudgetField,
    })
  }

  updateNewBudgetAmount(ev) {
    ev.preventDefault();
    let newAmount = ev.target.value;
    this.setState({
      newBudgetAmount: newAmount
    });
  }

  handleNewBudgetSubmit(ev) {
    ev.preventDefault();
    let month = this.state.displayMonth;
    let year = this.state.displayYear;
    let i = this.getDisplayMonthIndex(month, year);
    let newBudgetAmount = parseFloat(this.state.newBudgetAmount);
    this.setState((state, props) => {
      let budget = state.monthlyBudgets[i];
      budget.budget = newBudgetAmount;
      state.newBudgetAmount = '';
      state.monthlyBudgets[i] = budget;
      return state;
    })
    this.toggleEditBudgetField();
  }

  handleNewBudgetBack(ev) {
    ev.preventDefault();
    this.setState({
      newBudgetAmount: '',
    })
    this.toggleEditBudgetField();
  }

  renderTargetBudget(budgetForMonth) {
    if (!this.state.showEditBudgetField) {
      return (
        <tr>
          <td>Target Budget</td>
          <td className="point-on-hover" title="double click to edit" onDoubleClick={this.toggleEditBudgetField}>${budgetForMonth}</td>
        </tr>
      )
    }
    return (
      <tr className="change-budget-form">
        <td>Target Budget</td>
        <td>
          <form className="form-inline">
            <input value={this.state.newBudgetAmount} onChange={this.updateNewBudgetAmount} className="form-control" type="text" placeholder="New budget amount." />
            <div className="button-group">
              <button onClick={this.handleNewBudgetSubmit} className="btn btn-dark">Submit</button>
              <button onClick={this.handleNewBudgetBack} className="btn btn-dark">Back</button>
            </div>
          </form>
        </td>
      </tr>
    )
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
          <button className="btn btn-light" onClick={this.displayPreviousMonth}>Last Month</button>
          <h1 className="header-light">{monthName} {yearName}</h1>
          <button className="btn btn-light" onClick={this.displayNextMonth}>Next Month</button>
        </div>

        <table className="table">
          <tbody>
            {this.renderTargetBudget(budgetForMonth)}
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

        <form className="new-expense-form">
          <fieldset>
            <legend>Enter New Expense:</legend>
            <div className="form-group">
              <label for="new-expense-day">Day</label>
              <select id="new-expense-day" className="custom-select" onChange={this.updateNewExpenseDay}>
                {daysInMonth.map(i => {
                  return <option key={`day-${i}`} value>{i}</option>
                })}
              </select>
            </div>
            <div className="form-group">
              <label for="new-expense-description">Description</label>
              <input id="new-expense-description" type="text" className="form-control" value={this.state.newExpense.description} placeholder="Describe Expense" onChange={this.updateNewExpenseDescription}/>
            </div>
            <div className="form-group">
              <label for="new-expense-amount">Amount</label>
              <input id="new-expense-amount" type="text" className="form-control" value={this.state.newExpense.amount} placeholder="$9999.99" onChange={this.updateNewExpenseAmount}/>
            </div>
            <button type="submit" className="btn btn-dark" onClick={this.addNewExpense}>Add Expense</button>
          </fieldset>
        </form>

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
                <td>${expense.amount.toFixed(2)} <button className="btn btn-danger" onClick={this.removeExpense(i)}>-</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
