import React from 'react';
import '../css/index.css';
import '../css/month-display.css';
import '../css/table.css';
import '../css/add-expense-form.css';
import '../css/change-budget-form.css';

const BudgetSummaryTable = props => {
  let targetBudgetRow;
  if (!props.showEditBudgetField) {
    targetBudgetRow =  (
      <tr>
        <td>Target Budget</td>
        <td className="point-on-hover" title="double click to edit" onDoubleClick={props.toggleEditBudgetField}>${props.budgetForMonth}</td>
      </tr>
    )
  } else {
    targetBudgetRow = (
      <tr className="change-budget-form">
        <td>Target Budget</td>
        <td>
          <form className="form-inline">
            <input value={props.newBudgetAmount} onChange={props.updateNewBudgetAmount} className="form-control" type="text" placeholder="New budget amount." />
            <div className="button-group">
              <button onClick={props.handleNewBudgetSubmit} className="btn btn-dark">Submit</button>
              <button onClick={props.handleNewBudgetBack} className="btn btn-dark">Back</button>
            </div>
          </form>
        </td>
      </tr>
    )
  }
  return (
    <table className="table">
      <tbody>
        {targetBudgetRow}
        <tr>
          <td>Total Expenses</td>
          <td>${props.totalExpensesForCurrentMonth.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Budget Left</td>
          <td>${props.budgetLeft.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default BudgetSummaryTable;
