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
          expenses: [
          {/*
            {
              day: 'integer',
              amount: 'numeric' > 0, //should be rounded to 2 decimal places
              description: 'string'
            },
            ...
          */}
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

  render() {
    let budgetForMonth = this.budgetForMonth(this.state.displayMonth, this.state.displayYear);
    return (
      <div className="App">
        <h1>{this.getMonthName(this.state.displayMonth)} {this.state.displayYear}</h1>
        <h1>Target Budget: ${budgetForMonth}</h1>
      </div>
    );
  }
}

export default App;
