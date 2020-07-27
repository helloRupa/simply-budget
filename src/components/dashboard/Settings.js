import React, { useState, useEffect } from 'react';
import { handleChange, handleChangeWithRegex } from '../../utils/handlers';
import { updateSettings } from '../../utils/comms';

import { connect } from 'react-redux';

function Settings({ setShowSettings, settings }) {
  const [currency, setCurrency] = useState('');
  const [maxItems, setMaxItems] = useState('');

  useEffect(() => {
    setCurrency(settings['default-currency']);
    setMaxItems(settings['max-length']);
    // getSettings()
    //   .then(settings => {
    //     setCurrency(settings['default-currency']);
    //     setMaxItems(settings['max-length']);
    //   });
  }, []);

  const handleMaxItems = e => {
    handleChangeWithRegex(e, /^\d+$/, setMaxItems);
  }

  const handleSubmit = e => {
    e.preventDefault();
    updateSettings({
      "default-currency": currency,
      "max-length": maxItems
    });
    setShowSettings(false);
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

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Settings);
