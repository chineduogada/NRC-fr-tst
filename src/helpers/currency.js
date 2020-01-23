export default value => {
  return value.toLocaleString('en', {
    currency: 'NGN',
    currencyDisplay: 'symbol',
    style: 'currency'
  });
};
