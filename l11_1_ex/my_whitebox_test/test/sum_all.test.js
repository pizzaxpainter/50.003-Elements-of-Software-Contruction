const sum_all = require('../src/sum_all');

describe("test suite for sum_all", () => {
    test ("test 1 for sum_all", () => {
        const expected = 55;
        expect(sum_all([1,2,3,4,5,6,7,8,9,10])).toBe(expected);
    })
})