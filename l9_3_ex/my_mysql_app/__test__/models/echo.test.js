const db = require('../../models/db.js');
const message = require('../../models/message.js');
const request = require('supertest')
const app = require('../../app');

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

describe("routes.echo endpoint integration tests", () => {
    beforeAll(async () => {
        await setup();
    });
    test ("testing /echo/all", async () => {
        const res = await request(app).get('/echo/all');
        const expected = [ new message.Message('msg a', new Date('2009-01-01:00:00:00')), 
                           new message.Message('msg b', new Date('2009-01-02:00:00:00'))]
        expect(res.statusCode).toEqual(200);
        const json = JSON.parse(res.text);
        const received = [];
        for (let i in json) {
            received.push(new message.Message(json[i].msg, new Date(json[i].time)))
        }
        expect(received.sort()).toEqual(expected.sort());
    });
    afterAll(async () => {
        await teardown();
    });

})
