import React, { useState } from 'react';
import FormHOC from '../shared/FormHOC';
import { patchSettings } from '../actions/settings_actions';
import { connect } from 'react-redux';
import Close from '../shared/Close';
import { chooseDashboard } from '../actions/ui_actions';
import SubmitButton from '../shared/SubmitButton';

function Settings({ 
  settings, 
  patchSettings, 
  handleChange, 
  handleChangeWithRegex,
  Error,
  chooseDashboard
}) {
  const [currency, setCurrency] = useState(settings['default-currency']);
  const [maxItems, setMaxItems] = useState(settings['max-length']);

  const handleMaxItems = e => {
    handleChangeWithRegex(e, /^\d+$/, setMaxItems);
  };

  const parseMaxItems = () => parseInt(maxItems, 10);

  const isValidLineItems = () => parseMaxItems() >= 10;

  const handleSubmit = e => {
    e.preventDefault();

    if (isValidLineItems()) {
      patchSettings({
        "default-currency": currency,
        "max-length": parseMaxItems()
      });
      chooseDashboard();
    }
  };

  return <div>
    <h2>Settings</h2>
    <Close callback={chooseDashboard} display='Close' />
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
        <span>
          Once a budget goes over the maximum, items will be deleted in first-in-first-out order, 
          one whole period at a time.
        </span>
      </div>

      <SubmitButton value="Save" />

      <Error 
        msg="Maximum number of line items must be 10 or more" 
        condition={!isValidLineItems()} 
      />
    </form>
  </div>
}

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps, { patchSettings, chooseDashboard })(FormHOC(Settings));
