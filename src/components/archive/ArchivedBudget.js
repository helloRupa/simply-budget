import React, { useState } from 'react';
import Delete from './Delete';

function ArchivedBudget({ archived, archived: { 
    name, 
    startDate, 
    currency, 
    totalTracking, 
    totalSpent, 
    endDate
  }
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <h2>{name}</h2>
      <p>Started on {startDate}, Ended on {endDate}</p>
      <p>Total Spent: {currency}{totalSpent}</p>
      <p>Total Tracking: {currency}{totalTracking}</p>
      <button onClick={() => setShowDelete(true)}>Delete</button>
      {showDelete ? <Delete {...{ setShowDelete, archived }} /> : null}
    </>
  );
}

export default ArchivedBudget;
