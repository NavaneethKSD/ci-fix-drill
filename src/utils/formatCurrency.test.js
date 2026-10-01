const { formatCurrency } = require('./formatCurrency');

test('formats currency correctly', () => {
  // Object assertions need deep equality because the returned object is a different reference.
  expect(formatCurrency(10.005, 'USD')).toEqual({ amount: 10.01, currency: 'USD' });
});
