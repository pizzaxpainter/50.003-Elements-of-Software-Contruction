const FibSeq = require('../src/FibSeq.js');

describe("FibSeq class test", () => {
    const fibSeq = new FibSeq();
    test ("first fib num is 1", () => {
        const result = fibSeq.next();
        expect(result).toBe(1);
    });
    test ("second fib num is 2", () => {
        const result = fibSeq.next();
        expect(result).toBe(2);
    });
})

describe("FibSeq class test with setup and tear down", () =>{
    let fibSeq = null;
    beforeEach(() => {
        fibSeq = new FibSeq();
    });
    test ("first fib num is 1 after reset", () => {
        const result = fibSeq.next();
        expect(result).toBe(1);
    });
    test ("second fib num is 1 after reset", () => {
        const result = fibSeq.next();
        expect(result).toBe(1);
    });
    afterEach(() => {
        fibSeq = null;
    })
})