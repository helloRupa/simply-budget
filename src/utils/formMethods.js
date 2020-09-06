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
