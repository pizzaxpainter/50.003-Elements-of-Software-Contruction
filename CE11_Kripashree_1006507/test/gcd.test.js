const gcd = require('../src/gcd.js');

describe('Testing gcd function', () => {
  // Test for null case (both x and y are less than 1)
  test('Both x and y are less than 1', () => {
    const result = gcd(0, 0);
    expect(result).toBeNull();
  });

  // Test for null case (x is less than 1, y is greater than or equal to 1)
  test('x is less than 1, y is greater than or equal to 1', () => {
    const result = gcd(0, 5);
    expect(result).toBeNull();
  });

  // Test for non-null case (x is greater than or equal to 1, and x and y are not equal)
  test('x is greater than or equal to 1, and x and y are not equal', () => {
    const result = gcd(15, 9);
    expect(result).toBe(3);
  });

  // Additional test cases for MCDC coverage:

  // Test case with both conditions x < 1 and x != y evaluated to true
  test('Both x < 1 and x != y are true', () => {
    const result = gcd(0, 3);
    expect(result).toBeNull();
  });

  // Test case with condition x < 1 evaluated to true and x != y evaluated to false
  test('x < 1 is true and x != y is false', () => {
    const result = gcd(0, 0);
    expect(result).toBeNull();
  });

  // Test case with condition x < 1 evaluated to false and x != y evaluated to true
  test('x < 1 is false and x != y is true', () => {
    const result = gcd(5, 3);
    expect(result).toBe(1);
  });

  // Test case with both conditions x < 1 and x != y evaluated to false
  test('Both x < 1 and x != y are false', () => {
    const result = gcd(6, 6);
    expect(result).toBe(6);
  });
});
