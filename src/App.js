import React from 'react';

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
    let initialMonth = 1; //HARD CODED
    let initialYear = 2020; //HARD CODED
    this.state = {
      displayMonth: initialMonth,
      displayYear: initialYear,
      monthlyBudgets: [
        {
          month: initialMonth,
          year: initialYear,
          budget: 0, //should be rounded to 2 decimal places
          expenses: [ // should be empty when initialized, or pulled from
            // a cache or database on render
            {
              day: 2,
              amount: 20000, //should be rounded to 2 decimal places
              description: 'rent'
            },
            {
              day: 4,
              amount: 400,
              description: 'gas'
            },
            {
              day: 7,
              amount: 1200,
              description: 'groceries'
            }
          ]
        }
      ]
    }

    this.getMonthName = this.getMonthName.bind(this);
    this.budgetForMonth = this.budgetForMonth.bind(this);
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
    let budgetForMonth = this.budgetForMonth(this.state.displayMonth, this.state.displayYear);
    let expensesForMonth = this.expensesForMonth(this.state.displayMonth, this.state.displayYear);
    let monthName = this.getMonthName(this.state.displayMonth);
    let yearName = this.state.displayYear;
    return (
      <div className="App">
        <h1>{monthName} {yearName}</h1>
        <h1>Target Budget: ${budgetForMonth}</h1>
        <ul>
          {expensesForMonth.map(expense => {
            return (
              <li>
                Date: {monthName} {expense.day} {yearName} <br />
                Description: {expense.description} <br />
                Amount: ${expense.amount.toFixed(2)}
              </li>
            )
          })}
        </ul>
        <h1>Total Expenses: {totalExpensesForCurrentMonth} </h1>
      </div>
    );
  }
}

export default App;
