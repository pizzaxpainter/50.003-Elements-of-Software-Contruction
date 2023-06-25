const express = require('express');
const staffmodel = require('../models/staff.js');
const deptmodel = require('../models/dept.js');
var router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req, res, next) {
    //res.send(`TODO`); // TODO: Fixme
    const id = req.params.id;
    const name = req.params.name;
    const code = req.params.code;
    const staff = new staffmodel.Staff(id, name, code);
    await staffmodel.insertMany([staff]);
    res.send(`inserted ${staff.id} ${staff.name} ${staff.dept}`);
});

/* GET staff listing. */

router.get('/all/', async function(req, res, next) {
    //res.send(`TODO`); // TODO: Fixme
    const staffs = await staffmodel.all();
    res.send(staffs);
});




module.exports = router;
