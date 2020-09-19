import React from 'react';
import { handleAmountChange } from '../utils/formMethods';

function NumberInput({ value, callback, className="", autoFocus=false }) {
  return <input 
    type="text" 
    placeholder="100.00" 
    value={value}
    onChange={e => handleAmountChange(e, callback)}
    className={className}
    autoFocus={autoFocus}
  />
}

export default NumberInput;
