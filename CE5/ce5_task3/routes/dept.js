const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
var router = express.Router();


router.get('/add/:code', async function(req, res, next) {
    var code = req.params.code;
    var dept = new deptmodel.Dept(code);
    await deptmodel.insertMany([dept]);
    res.send(deptmodel.find(dept));
});



/* GET dept listing. */

router.get('/all/', async function(req, res, next) {
    var depts = await deptmodel.all();
    res.send(depts);
});


router.get('/all/withstaff/', async function(req, res, next) {
    /* find all depts, then for each dept, find all staff */
    var depts = await deptmodel.all();
    var deptstaff = [];
    for (var i = 0; i < depts.length; i++) {
        var dept = depts[i];
        var staff = await staffmodel.find({dept: dept.code});
        deptstaff.push({dept: dept, staff: staff});
    }
    res.send(deptstaff);
})


module.exports = router;
