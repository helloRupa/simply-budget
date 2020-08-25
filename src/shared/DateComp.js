import React, { useState } from 'react';
import { formatDate, replaceHyphens, replaceForwardSlashes } from '../utils/format';

function DateComp({ setStartDate, date, disabled = false }) {
  const [dateVal, setDateVal] = useState(replaceForwardSlashes(date));
  const today = formatDate(new Date(), '-');

  const handleChange = e => {
    const date = replaceHyphens(e.target.value);

    setDateVal(e.target.value);
    setStartDate(formatDate(new Date(date)));
  };

  return (
    <input 
      type="date" 
      min={today} 
      onChange={handleChange} 
      disabled={disabled} 
      value={dateVal}
    />
  );
}

export default DateComp;
