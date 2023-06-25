const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
var router = express.Router();


router.get('/add/:code', async function(req, res, next) {
    //res.send(`TODO`); // TODO: Fixme
    const code = req.params.code;
    const dept = new deptmodel.Dept(code);
    await deptmodel.insertMany([dept]);
    res.send(`inserted ${dept.code}`);
});



/* GET dept listing. */

router.get('/all/', async function(req, res, next) {
    //res.send(`TODO`); // TODO: Fixme
    const depts = await deptmodel.all();
    res.send(depts);
});


router.get('/all/withstaff/', async function(req, res, next) {
    //res.send(`TODO`); // TODO: Fixme
    const depts = await deptmodel.all();
    const staffs = await staffmodel.all();
    for (var i = 0; i < depts.length; i++) {
        depts[i].staff = [];
        for (var j = 0; j < staffs.length; j++) {
            if (depts[i].code == staffs[j].dept) {
                depts[i].staff.push(staffs[j]);
            }
        }
    }
})


module.exports = router;
