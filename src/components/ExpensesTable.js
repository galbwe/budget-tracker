import React from 'react';

const ExpensesTable = props => {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Date</td>
          <td>Description</td>
          <td>Amount</td>
        </tr>
      </thead>
      <tbody>
      {props.expensesForMonth.map((expense, i) => {
        return (
          <tr key={`expense-${i}`}>
            <td>{props.monthName} {expense.day} {props.yearName}</td>
            <td>{expense.description} </td>
            <td>${expense.amount.toFixed(2)} <button className="btn btn-danger" onClick={props.removeExpense(i)}>-</button></td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export default ExpensesTable;
