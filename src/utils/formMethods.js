export const handleChange = (e, callback) => {
  callback(e.target.value);
};

export const handleChangeWithRegex = (e, expr, callback) => {
  const regex = RegExp(expr);
  const value = e.target.value;

  if (regex.test(value) || !value) {
    handleChange(e, callback);
  }
};

export const handleAmountChange = (e, callback) => {
  handleChangeWithRegex(e, /^\d+(\.\d?\d?)?$/, callback);
};

export const handleAmountChangeNeg = (e, callback) => {
  const regex = RegExp(/^\d+(\.\d?\d?)?$/);
  let negStr = '';
  let value = e.target.value;

  if (value.startsWith('-')) {
    negStr = '-';
    value = value.slice(1);
  }

  if (regex.test(value) || !value) {
    callback(negStr + value);
  }
};

export const validateAmount = amount => !isNaN(parseFloat(amount));
