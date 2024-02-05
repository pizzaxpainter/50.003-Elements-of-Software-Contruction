const mutateString = require('../src/mutateString.js');

describe ('Testing mutateString function', () => {
    test('Input string must have at least two characters', () => {
        const result = mutateString('a');
        expect(result).toThrowError('Input string must have at least two characters.');
    }
    );

    test('SUTD to convert to SUDT', () => {
        const result = mutateString('SUTD');
        expect(result).not.toBe('SUTD');
    }
    );
});