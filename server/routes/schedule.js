var express = require('express');
var router = express.Router();
const scheduleService = require('../service/schedule.js');

router.get('/get', async function (req, res, next) {
    const { limit, page, condition } = req.query;
    const data = await scheduleService.get({ limit, page, condition });
    res.send(data);
});
router.post('/add', async function (req, res, next) {
    const dataAdd = req.body;
    const data = await scheduleService.add(dataAdd);
    res.send(data);
});
router.post('/del', async function (req, res, next) {
    const { _id } = req.body;
    const data = await scheduleService.del({ _id });
    res.send(data);
});
router.post('/update', async function (req, res, next) {
    const dataUpdate = req.body;
    const data = await scheduleService.update(dataUpdate);
    res.send(data);
});

module.exports = router;