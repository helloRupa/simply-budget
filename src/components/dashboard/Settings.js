import React, { useState } from 'react';
import { handleChange, handleChangeWithRegex } from '../../utils/handlers';
import { patchSettings } from '../../actions/settings_actions';
import { connect } from 'react-redux';

function Settings({ setShowSettings, settings, patchSettings }) {
  const [currency, setCurrency] = useState(settings['default-currency']);
  const [maxItems, setMaxItems] = useState(settings['max-length']);

  const handleMaxItems = e => {
    handleChangeWithRegex(e, /^\d+$/, setMaxItems);
  }

  const handleSubmit = e => {
    e.preventDefault();
    patchSettings({
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

export default connect(mapStateToProps, { patchSettings })(Settings);
