export const initialState = {
  newExpense: {
    day: 1,
    description: '',
    amount: 0,
  },
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
