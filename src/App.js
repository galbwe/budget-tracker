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
          budget: 0,
          expenses: [
          {/*
            {
              day: 'integer',
              amount: 'numeric' > 0,
              description: 'string'
            },
            ...
          */}
        ]
           }
      ]
    }

    this.getMonthName = this.getMonthName.bind(this);
  }

  getMonthName(monthNumber) {
    return MONTH_NAMES[monthNumber - 1];
  }

  render() {
    return (
      <div className="App">
        <h1>{this.getMonthName(this.state.displayMonth)} {this.state.displayYear}</h1>
      </div>
    );
  }
}

export default App;
