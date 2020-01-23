import React from 'react';

const TargetBudgetRow = props => {
  if (!props.showEditBudgetField) {
    return (
      <tr>
        <td>Target Budget</td>
        <td className="point-on-hover" title="double click to edit" onDoubleClick={props.toggleEditBudgetField}>${props.budgetForMonth}</td>
      </tr>
    )
  }
  return (
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

export default TargetBudgetRow;
