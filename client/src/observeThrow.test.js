const observeThrow = require('./observeThrow');

test('yuts laying flat on their back', () => {
  expect(observeThrow([0, 0, 0, 0])).toBe(0);
});