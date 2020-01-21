export const demoState = {
  newExpense: {
    day: 1,
    description: '',
    amount: '',
  },
  displayMonth: 1,
  displayYear: 2020,
  monthlyBudgets: [
    {
      month: 12,
      year: 2019,
      budget: 50000,
      expenses: [
        {
          day: 1,
          amount: 20000,
          description: 'rent'
        },
        {
          day: 3,
          amount: 2050,
          description: 'groceries'
        },
        {
          day: 19,
          amount: 1907.23,
          description: 'electric bill'
        },
        {
          day: 12,
          amount: 1119.98,
          description: 'gas'
        },
        {
          day: 24,
          amount: 25000,
          description: 'last minute holiday shopping'
        },
      ]
    },
    {
      month: 1,
      year: 2020,
      budget: 52000,
      expenses: [
        {
          day: 1,
          amount: 20000,
          description: 'rent'
        },
        {
          day: 3,
          amount: 1200,
          description: 'groceries'
        },
        {
          day: 9,
          amount: 1123.85,
          description: 'gas',
        },
        {
          day: 13,
          amount: 900.23,
          description: 'cell phone bill'
        },
        {
          day: 14,
          amount: 1399.99,
          description: 'new gym membership'
        },
      ]
    },
    {
      month: 2,
      year: 2020,
      budget: 52000,
      expenses: [
        {
          day: 1,
          amount: 20000,
          description: 'rent'
        },
        {
          day: 5,
          amount: 1153.32,
          description: 'groceries'
        }
      ]
    },
  ]
}
