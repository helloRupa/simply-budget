import React, { useState } from 'react';
import DeleteWrapper from '../../shared/Delete';
import { destroyArchived } from '../../actions/archive_actions';

const Delete = DeleteWrapper(destroyArchived);

function ArchivedBudget({ archived, archived: { 
    name, 
    startDate, 
    currency, 
    totalTracking, 
    totalSpent, 
    endDate
  }
}) {
  const [remove, setRemove] = useState(false);

  return (
    <>
      <h2>{name}</h2>
      <p>Started on {startDate}, Ended on {endDate}</p>
      <p>Total Spent: {currency}{totalSpent}</p>
      <p>Total Tracking: {currency}{totalTracking}</p>
      <button onClick={() => setRemove(true)}>Delete</button>
      {remove ? <Delete deletable={archived} {...{name, setRemove}} /> : null}
    </>
  );
}

export default ArchivedBudget;
