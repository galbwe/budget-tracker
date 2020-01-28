import React from 'react';

const MonthDisplay = props => {
  return (
    <div className="month-display">
      <button className="btn btn-light" onClick={props.displayPreviousMonth}>Last Month</button>
      <h1 className="header-light">{props.monthName} {props.yearName}</h1>
      <button className="btn btn-light" onClick={props.displayNextMonth}>Next Month</button>
    </div>
  )
}

export default MonthDisplay;
