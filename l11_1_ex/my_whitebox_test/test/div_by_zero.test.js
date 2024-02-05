const f = require('../src/div_by_zero');

describe("test suite for div_by_zero", () => {
    test ("test 1 for f", () => {
        const expected = -9;
        expect(f(5,-5)).toBe(expected);
    })
    test ("test 2 for f", () => {
        const expected = 7.714285714285714;
        expect(f(7,5)).toBeCloseTo(expected,5);
    })
})