export function handleChange(e, callback) {
  callback(e.target.value);
};

export function handleChangeWithRegex(e, expr, callback) {
  const regex = RegExp(expr);
  const value = e.target.value;

  if (regex.test(value) || !value) {
    handleChange(e, callback);
  }
};
