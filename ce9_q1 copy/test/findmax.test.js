const findmax = require('../src/findmax.js');

describe('testing findmax', () => {
    // TODO: a test that results in failure (do not compute maximum) it should fail
    test('a test that fails', () => {
        const list1 = findmax([1, 5, 3, 9, 2]);
        expect(list1).toBe(1);

    })
    // TODO: a test that results in error, it should throw an error that the test won't catch
    test('a test that throws error', () => { 
        const list2 = findmax(undefined);
        expect(list2).toThrow();

    })
    // TODO: a test that results in pass
    test('a test that passes', () => {
        const list3 = findmax([1, 5, 3, 9, 2]);
        expect(list3).toBe(9);
    })
});


describe('equivalence class testing', () => {
//A test that finds array with negative values
    test('a test that finds empty arrays', () => {
    const list4 = findmax([]);
    expect(list4).toBe(undefined);

})
//A test that finds array with null values
test('a test that finds array with null values', () => { 
    const list5 = findmax([]);
    expect(list5).toBe(undefined);

})
//A test that finds array with NaN values
test('a test that finds array with NaN values', () => {
    const list6 = findmax([NaN, NaN, NaN, NaN, NaN]);
    expect(list6).toBeNaN();
})

//A test that finds array with a single ordinal value
test('a test that finds array with a single ordinal value', () => {
    const list7 = findmax([5]);
    expect(list7).toBe(5);
})

//A test that finds array with more than one ordinal value and max value at index 0
test('a test that finds array with more than one ordinal value and max value at index 0', () => {
    const list8 = findmax([19, 5, 3, 1, 2]);
    expect(list8).toBe(19);
})

//A test with more than one ordinal value and the max value is at index N-1, where N is the length
test('a test that finds array with NaN values', () => {
    const list9 = findmax([1, 5, 3, 19, 2]);
    expect(list9).toBe(19);
})

//A test that finds array with more than one ordinal value and the max value is not at index 0 nor index N-1
test('a test that finds array with NaN values', () => {
    const list10 = findmax([1, 19, 3, 5, 2]);
    expect(list10).toBe(19);
})

});

