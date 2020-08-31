import React from 'react';
import { connect } from 'react-redux';
import { destroyArchived } from '../../actions/archive_actions';

function ArchivedBudget({ 
  archived: { 
    name, 
    startDate, 
    currency, 
    totalTracking, 
    totalSpent, 
    endDate}, 
  destroyArchived 
}) {

  return (
    <>
      <h2>{name}</h2>
      <p>Started on {startDate}, Ended on {endDate}</p>
      <p>Total Spent: {currency}{totalSpent}</p>
      <p>Total Tracking: {currency}{totalTracking}</p>
    </>
  );
}

export default connect(null, { destroyArchived })(ArchivedBudget);
