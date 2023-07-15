const capcat = require('../src/capcat.js');
const fs = require('node:fs').promises;
const existsSync = require('node:fs').existsSync;

async function setup() {
    // make sure the input file for the first test case exists
    await fs.writeFile('./test1.txt', 'hello');
    // make sure the input file for the second test case does not exist
    if (existsSync('./test2.txt')) {
        await fs.rm('./test2.txt');
    }
}

async function teardown() {
    await fs.rm('./test1.txt');
} 


describe("capcat tests", () => {
    beforeAll(async () => {
        await setup();
    });

    test ("printing an existing file", async () => {
        const result = await capcat('./test1.txt');
        expect(result).toBe('HELLO');
    });
    
    test ("printing a non-existing file", async () => {
        try {
            await capcat('./test2.txt');
        } catch (e) {
            expect(e.code).toBe('ENOENT');
        };
    });
    
    afterAll(async () => {
        await teardown();
    })
})