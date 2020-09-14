import React from 'react';
import Form from '../../shared/Form';
import NumberInput from '../../shared/NumberInput';
import SubmitButton from '../../shared/SubmitButton';
import ClickOrHold from '../../shared/ClickOrHold';

function SimpleExpenditureForm({ currency, amount, setAmount, holdCallback, clickCallback }) {
  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      clickCallback();
    }
  };

  return <div className="absolute">
  <div className="fixed-bottom" onKeyPress={handleEnterKey}>
  <Form className="simple-expenditure-form">
    <span className="currency">{currency}</span>
    <NumberInput value={amount} callback={setAmount} />

    <ClickOrHold clickCallback={clickCallback} holdCallback={holdCallback}>
      <SubmitButton value="+" />
    </ClickOrHold>
  </Form>
  </div>
  </div>
}

export default SimpleExpenditureForm;
