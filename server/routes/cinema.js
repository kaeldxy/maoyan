var express = require('express');
var router = express.Router();
const cinemaService = require('../service/cinema.js');

router.get('/get', async function (req, res, next) {
    const { limit, page } = req.query;
    const data = await cinemaService.get({ userName, pwd, userType });
    res.send(data);
});
router.post('/add', async function (req, res, next) {
    const dataAdd = req.body;
    const data = await cinemaService.add(dataAdd);
    res.send(data);
});
router.post('/del', async function (req, res, next) {
    const { _id } = req.body;
    const data = await cinemaService.del({ _id });
    res.send(data);
});
router.post('/update', async function (req, res, next) {
    const { userName, pwd, userType } = req.body;
    const data = await cinemaService.update({ userName, pwd, userType });
    res.send(data);
});

module.exports = router;