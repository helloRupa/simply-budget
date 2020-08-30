import React from 'react';
import { connect } from 'react-redux';
import { patchSettings } from '../../actions/settings_actions';
import FormHOC from '../../shared/FormHOC';
import DateComp from '../../shared/DateComp';

function ExpenditureForm({
  onSubmit,
  title,
  setTitle,
  categories,
  currency,
  amount,
  setAmount,
  patchSettings,
  handleChange,
  handleAmountChange,
  Error,
  showError,
  setExpenseDate,
  expenseDate,
  startDate
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
      onChange={e => handleChange(e, setTitle)}
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
      onChange={e => handleAmountChange(e, setAmount)}
    />

    <label>
      Set date of expense (optional): 
      <DateComp 
        setStartDate={setExpenseDate} 
        date={expenseDate} 
        minDate={startDate}
        maxDate={new Date()} />
    </label>

    <input type="submit" value="Save" />
    <Error msg="Amount is required" condition={showError} />
  </form>
}

const mapStateToProps = state => ({
  categories: state.settings.categories
});

export default connect(mapStateToProps, { patchSettings })(FormHOC(ExpenditureForm));
