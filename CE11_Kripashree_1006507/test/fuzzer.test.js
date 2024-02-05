const fuzzer = require('../fuzzer.js');

describe('Testing fuzzer function', () => {
    test('Fuzzer function should return a string', () => {
        const result = fuzzer();
        expect(typeof result).toBe('string');
    }
    );
});