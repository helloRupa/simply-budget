import React from 'react';
import { connect } from 'react-redux';
import { patchSettings } from '../../actions/settings_actions';

function ExpenditureForm({
  onSubmit,
  title,
  handleTextChange,
  categories,
  currency,
  amount,
  handleCostChange,
  patchSettings
}) {
  const handleCategory = title => {
    if (!categories.includes(title)) {
      patchSettings({ categories: [...categories, title] });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleCategory(title);
    onSubmit(e);
  }

  return <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      placeholder="Title (optional)" 
      value={title}
      onChange={handleTextChange}
      list="saved-categories"
    />
    <datalist id="saved-categories">
      { categories.map(name => <option value={name} key={name} />) }
    </datalist>
    {currency}
    <input 
      type="text" 
      placeholder="20.60" 
      value={amount}
      onChange={handleCostChange}
    />
    <input type="submit" value="Save" />
  </form>
}

const mapStateToProps = state => ({
  categories: state.settings.categories
});

export default connect(mapStateToProps, { patchSettings })(ExpenditureForm);
