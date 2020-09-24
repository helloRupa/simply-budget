import React, { useState } from 'react';
import DeleteWrapper from '../../shared/DeleteWrapper';
import { destroyArchived } from '../../actions/archive_actions';
import { displayDate } from '../../utils/format';
import { setTrackingClassName } from '../../utils/classNameSelectors';
import Button from '../../shared/Button';

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
  const trackingClassName = setTrackingClassName(totalTracking);

  return (
    <>
      <h3>{name}</h3>
      <div className="archive-details">
        <p>Ran from {displayDate(startDate)} to {displayDate(endDate)}</p>
        <p>Goal was to spend {currency}{limit} per {frequency}</p>
      </div>
      
      <div className="archive-results">
        <p>
          <span>Total Spent:</span>
          <span>{currency}{totalSpent}</span>
        </p>

        <p>
          <span>Total Savings:</span>
          <span className={`${trackingClassName}`}>{currency}{totalTracking}</span>
        </p>
      </div>
      
      <Button
        callback={() => setRemove(true)}
        className="delete-btn"
        display="Delete" />
        
      {remove ? <Delete deletable={archived} {...{name, setRemove}} /> : null}
    </>
  );
}

export default ArchivedBudget;
