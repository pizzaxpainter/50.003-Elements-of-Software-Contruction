const findmax = require('../src/findmax.js');

describe('testing findmax', () => {
    // TODO: a test that results in failure (do not compute maximum) it should fail
    test('a test that fails', () => {
        const result = findmax(i>list.length-1);
        expect(result).toBe("Test failed");
    })
    // TODO: a test that results in error, it should throw an error that the test won't catch
    test('a test that throws error', () => { 
        const result = findmax(i=list.length-1);
        expect(result).toBe("Error: no test specified");

    })
    // TODO: a test that results in pass
    test('a test that passes', () => {
        const result = findmax(i<list.length-1);
        expect(result).toBe("Test passed");
    })
});