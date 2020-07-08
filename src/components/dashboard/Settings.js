import React, { useState } from 'react';
import { handleChange, handleChangeWithRegex } from '../../utils/handlers';

function Settings() {
  const [currency, setCurrency] = useState('');
  const [maxItems, setMaxItems] = useState('');

  const handleMaxItems = e => {
    handleChangeWithRegex(e, /^\d+$/, setMaxItems);
  }

  const handleSubmit = e => {
    e.preventDefault();
  };

  return <div>
    <h2>Settings</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="default-currency">Default Currency</label>
        <input 
          type="text" 
          id="default-currency" 
          placeholder="$" 
          maxLength="2" 
          value={currency} 
          onChange={e => handleChange(e, setCurrency)} 
        />
      </div>

      <div>
        <label htmlFor="max-items">Maximum Number of Line Items</label>
        <input 
          type="text" 
          id="max-items" 
          value={maxItems}
          onChange={handleMaxItems}
        />
        <span>Once a budget goes over the maximum, items will be deleted in first-in-first-out order.</span>
      </div>

      <input type="submit" value="Save" />
    </form>
  </div>
}

export default Settings;
