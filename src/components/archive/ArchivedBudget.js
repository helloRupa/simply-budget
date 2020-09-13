import React, { useState } from 'react';
import DeleteWrapper from '../../shared/DeleteWrapper';
import { destroyArchived } from '../../actions/archive_actions';
import { displayDate } from '../../utils/format';

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
      <h3>{name}</h3>
      <p>Ran from {displayDate(startDate)} to {displayDate(endDate)}</p>
      <p>Goal was to spend {currency}{limit} per {frequency}</p>
      <p>Total Spent: {currency}{totalSpent}</p>
      <p>Total Tracking: {currency}{totalTracking}</p>
      <button onClick={() => setRemove(true)} className="delete">Delete</button>
      {remove ? <Delete deletable={archived} {...{name, setRemove}} /> : null}
    </>
  );
}

export default ArchivedBudget;
