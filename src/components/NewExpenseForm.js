import React from 'react';

const NewExpenseForm = (props) => {
  console.log(props);
  return (
    <form className="new-expense-form">
      <fieldset>
        <legend>Enter New Expense:</legend>
        <div className="form-group">
          <label for="new-expense-day">Day</label>
          <select id="new-expense-day" className="custom-select" onChange={props.updateNewExpenseDay}>
            {props.daysInMonth.map(i => {
              return <option key={`day-${i}`} value>{i}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label for="new-expense-description">Description</label>
          <input id="new-expense-description" type="text" className="form-control" value={props.description} placeholder="Describe Expense" onChange={props.updateNewExpenseDescription}/>
        </div>
        <div className="form-group">
          <label for="new-expense-amount">Amount</label>
          <input id="new-expense-amount" type="text" className="form-control" value={props.amount} placeholder="$9999.99" onChange={props.updateNewExpenseAmount}/>
        </div>
        <button type="submit" className="btn btn-dark" onClick={props.addNewExpense}>Add Expense</button>
      </fieldset>
    </form>
  )
}

export default NewExpenseForm;
