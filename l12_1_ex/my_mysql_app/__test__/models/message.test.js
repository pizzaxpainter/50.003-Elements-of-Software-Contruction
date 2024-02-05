const db = require('../../models/db.js');
const message = require('../../models/message.js');

async function setup() {
    try {
        // TODO backup the existing data to a temp table?
        await db.pool.query(`
            DELETE FROM message;`
        );
        await db.pool.query(`
            INSERT INTO message (msg, time) 
            VALUES ('msg a', '2009-01-01:00:00:00'),
                   ('msg b', '2009-01-02:00:00:00')
        `);
    } catch (error) {
        console.error("setup failed. " + error);
        throw error;
    }
}

async function teardown() {
    // TODO restore the table from the backup;
    try {
        await db.pool.query(`
            DELETE FROM message;`
        );
        await db.cleanup();
    } catch (error) {
        console.error("teardown failed. " + error);
        throw error;
    }
}

describe("models.message.all() tests", () => {
    beforeAll(async () => {
        await setup();
    });
    test ("testing message.all()", () => {
        const expected = [ new message.Message('msg a', new Date('2009-01-01:00:00:00')), 
                           new message.Message('msg b', new Date('2009-01-02:00:00:00'))]
        const result_promise = message.all();
        result_promise.then((result) => {
            expect(result.sort()).toEqual(expected.sort());
        });
    });
    afterAll(async () => {
        await teardown();
    });

})
