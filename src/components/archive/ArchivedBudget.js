import React, { useState } from 'react';
import DeleteWrapper from '../../shared/DeleteWrapper';
import { destroyArchived } from '../../actions/archive_actions';

const Delete = DeleteWrapper(destroyArchived);

function ArchivedBudget({ archived, archived: { 
    name, 
    startDate, 
    currency, 
    totalTracking, 
    totalSpent, 
    endDate,
    limit,
    frequency
  }
}) {
  const [remove, setRemove] = useState(false);

  return (
    <>
      <h2>{name}</h2>
      <p>Ran from {startDate} to {endDate}</p>
      <p>Goal was to spend {currency}{limit} per {frequency}</p>
      <p>Total Spent: {currency}{totalSpent}</p>
      <p>Total Tracking: {currency}{totalTracking}</p>
      <button onClick={() => setRemove(true)}>Delete</button>
      {remove ? <Delete deletable={archived} {...{name, setRemove}} /> : null}
    </>
  );
}

export default ArchivedBudget;
