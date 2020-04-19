export function formatNumber(value) {
  if (typeof value === 'number') {
    value = value.toString(10);
  }

  const dotIndex = value.indexOf('.');

  switch (dotIndex) {
    case -1:
      return `${value}.00`;
    case value.length - 1:
      return `${value}00`;
    case value.length - 2:
      return `${value}0`;
    default:
      return value;
  }
};
