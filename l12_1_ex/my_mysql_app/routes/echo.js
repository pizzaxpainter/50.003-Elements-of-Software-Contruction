const express = require('express');
const model = require('../models/message.js');
var router = express.Router();

/* GET echo listing. */
/* API call only, not for approach 1 or 2.
router.get('/:msg', async function(req, res, next) {
    const msg = req.params.msg;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    console.log(messages);
    res.send(`${JSON.stringify(messages)}`);
});
*/


/* for approach 1
router.get('/', async function(req, res, next) {
    const messages = await model.all();
    res.render(`echoform`, { 'title': "Echo App",'messages': messages});
});

router.post('/submit', async function(req, res, next) {
    const msg = req.body.message;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    res.render(`echoform`, { 'title': "Echo App", 'messages': messages});
});
*/


router.get('/', async function(req, res, next) {
    res.render(`echoajax`, { 'title': "Echo App"});
});

router.get('/all', async function(req, res, next) {
    const messages = await model.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(messages)}`);
});



router.post('/submit/', async function(req, res, next) {
    const msg = req.body.msg;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(messages)}`);
});

/* get version of the above
router.get('/submit/:msg', async function(req, res, next) {
    const msg = req.params.msg;
    const message = new model.Message(msg, new Date());
    await model.insertMany([message]);
    const messages = await model.all();
    res.send(`${JSON.stringify(messages)}`);
});
*/


module.exports = router;
