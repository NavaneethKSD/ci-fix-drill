const { calculateDiscount } = require('./calculateDiscount');

test('applies no discount when percent is 0', () => {
  expect(calculateDiscount(100, 0)).toBe(100); // This passes
});

test('applies 10 percent discount correctly', () => {
  // The implementation returns the price after subtracting 10 percent, so 100 becomes 90.
  expect(calculateDiscount(100, 10)).toBe(90);
});
