import React from 'react';
import { formatDate, replaceHyphens } from '../utils/format';

function DateComp({ setStartDate, disabled = false }) {
  const today = formatDate(new Date(), '-');

  const handleChange = e => {
    const date = replaceHyphens(e.target.value);

    setStartDate(formatDate(new Date(date)));
  };

  return (
    <input type="date" min={today} onChange={handleChange} disabled={disabled} />
  );
}

export default DateComp;
