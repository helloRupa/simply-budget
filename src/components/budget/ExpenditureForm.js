import React from 'react';
import { connect } from 'react-redux';
import { patchSettings } from '../../actions/settings_actions';
import FormHOC from '../../shared/FormHOC';
import DateComp from '../../shared/DateComp';
import SubmitButton from '../../shared/SubmitButton';
import NumberInput from '../../shared/NumberInput';
import TextInput from '../../shared/TextInput';

function ExpenditureForm({
  onSubmit,
  title,
  setTitle,
  categories,
  currency,
  amount,
  setAmount,
  patchSettings,
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
    <TextInput
      placeholder="Title (optional)"
      value={title}
      callback={setTitle}
      list="saved-categories" />

    <datalist id="saved-categories">
      { categories.map(name => <option value={name} key={name} />) }
    </datalist>
    
    {currency}

    <NumberInput value={amount} callback={setAmount} />

    <label>
      Set date of expense (optional): 
      <DateComp 
        setStartDate={setExpenseDate} 
        date={expenseDate} 
        minDate={startDate}
        maxDate={new Date()} />
    </label>

    <SubmitButton value="Save" />

    <Error msg="Amount is required" condition={showError} />
  </form>
}

const mapStateToProps = state => ({
  categories: state.settings.categories
});

export default connect(mapStateToProps, { patchSettings })(FormHOC(ExpenditureForm));
