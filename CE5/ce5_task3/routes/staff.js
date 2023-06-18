const express = require('express');
const staffmodel = require('../models/staff.js');
const deptmodel = require('../models/dept.js');
var router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.post('/add/:id/:name/:code', async function(req, res, next) {
    var id = req.params.id;
    var name = req.params.name;
    var code = req.params.code;
    var staff = new staffmodel.Staff(id, name, code);
    await staffmodel.insertMany([staff]);
    res.send(staffmodel.find(staff));
});

/* GET staff listing. */

router.get('/all/', async function(req, res, next) {
    var staff = await staffmodel.all();
    res.send(staff);
});


module.exports = router;
