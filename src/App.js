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
    this.state = {
      displayMonth: 1,
      displayYear: 2020,
      monthlyBudgets: [
        {
          month: 7,
          year: 2019,
          budget: 23423,
          expenses: []
        },
        {
          month: 7,
          year: 2018,
          budget: 48000,
          expenses: []
        },
        {
          month: 9,
          year: 2018,
          budget: 84392,
          expenses: []
        },
        {
          month: 8,
          year: 2018,
          budget: 23423,
          expenses: []
        },
        {
          month: 1,
          year: 2020,
          budget: 50000, //should be rounded to 2 decimal places
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
              day: 10,
              amount: 100,
              description: 'fast food'
            },
            {
              day: 7,
              amount: 1200,
              description: 'groceries'
            }
          ]
        },
        {
          month: 12,
          year: 2019,
          budget: 50000,
          expenses: [
            {
              day: 2,
              amount: 20000,
              description: 'rent'
            },
            {
              day: 5,
              amount: 500,
              description: 'gas'
            },
            {
              day: 7,
              amount: 1150,
              description: 'groceries'
            },
            {
              day: 15,
              amount: 450,
              description: 'gas'
            },
            {
              day: 24,
              amount: 40000,
              description: 'Last minute holiday shopping.'
            }
          ]
        }
      ]
    }

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
