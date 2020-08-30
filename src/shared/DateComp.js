import React, { useState, useEffect } from 'react';
import { formatDate, replaceHyphens, replaceForwardSlashes } from '../utils/format';

function DateComp({ setStartDate, date, disabled = false, shouldHaveMin = true }) {
  const [dateVal, setDateVal] = useState(replaceForwardSlashes(date));
  const today = formatDate(new Date(), '-');

  useEffect(() => {
    if (date === '') {
      setDateVal(date);
    }
  }, [date]);

  console.log('rendering date comp and date is: ', dateVal)

  const handleChange = e => {
    const date = replaceHyphens(e.target.value);

    setDateVal(e.target.value);
    setStartDate(formatDate(new Date(date)));
  };

  return (
    <input 
      type="date" 
      min={shouldHaveMin ? today : '' }
      onChange={handleChange} 
      disabled={disabled} 
      value={dateVal}
    />
  );
}

export default DateComp;
