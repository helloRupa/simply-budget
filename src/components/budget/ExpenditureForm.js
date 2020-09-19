import React from 'react';
import { connect } from 'react-redux';
import { patchSettings } from '../../actions/settings_actions';
import DateComp from '../../shared/DateComp';
import Form from '../../shared/Form';
import SubmitButton from '../../shared/SubmitButton';
import NumberInput from '../../shared/NumberInput';
import TextInput from '../../shared/TextInput';
import Error from '../../shared/Error';
import CancelButton from '../../shared/CancelButton';

function ExpenditureForm({
  onSubmit,
  title,
  setTitle,
  categories,
  currency,
  amount,
  setAmount,
  patchSettings,
  showError,
  setExpenseDate,
  expenseDate,
  startDate,
  close,
  edit=false
}) {
  const handleCategory = title => {
    if (!categories.includes(title.trim())) {
      patchSettings({ categories: [...categories, title] });
    }
  };

  const handleSubmit = e => {
    handleCategory(title);
    onSubmit(e);
  }

  return <div className="modal-background">
  <Form callback={handleSubmit} className="modal expenditure-form">
    <h2>{edit ? "Edit" : "Add"} an Expense</h2>

    <TextInput
      placeholder="Title (optional)"
      value={title}
      callback={setTitle}
      list="saved-categories"
      className="expense-title"
      autoFocus={true} />

    <datalist id="saved-categories">
      { categories.map(name => <option value={name} key={name} />) }
    </datalist>
    
    <div className="expense-amount">
      {currency}
      <NumberInput value={amount} callback={setAmount} className="amount" />
    </div>
    
    <div className="expense-date">
    <label htmlFor="expense-date">
      Date (optional): 
    </label>
      <DateComp 
        setStartDate={setExpenseDate} 
        date={expenseDate} 
        minDate={startDate}
        maxDate={new Date()} />
    </div>

    <Error msg="Amount is required" condition={showError} />

    <div className="buttons">
      <SubmitButton value="Save" />
      
      <CancelButton callback={close} />
    </div>
  </Form>
  </div>
}

const mapStateToProps = state => ({
  categories: state.settings.categories
});

export default connect(mapStateToProps, { patchSettings })(ExpenditureForm);
