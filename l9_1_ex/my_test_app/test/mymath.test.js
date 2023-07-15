const mymath = require('../src/mymath.js');

describe("mymath sum tests", () => {
    test ("summing of two positive numbers", () => {
        const result = mymath.sum(1,2);
        expect(result).toBe(3);
    })
    test ("summing of two negative numbers", () => {
        const result = mymath.sum(-3,-2);
        expect(result).toBe(-5);
    })
})