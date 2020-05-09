var express = require('express');
var router = express.Router();
const theaterService = require('../service/theater.js');
/* GET users listing. */

router.get('/get', async function (req, res, next) {
  let { limit, page, condition } = req.query;
  const data = await theaterService.get({ limit, page, condition });
  res.send(data);
})

router.post('/add', async function (req, res, next) {
  let {status, name, seat, cinemaId} = req.body;
  seat = JSON.parse(seat); // 数组需要以JSON字符串传输
  const data = await theaterService.add({ status, name, seat, cinemaId });
  res.send(data);
});

router.post('/del', async function (req, res, next) {
  const { _id } = req.body;
  const data = await theaterService.del({ _id });
  res.send(data);
});

router.post('/update', async function (req, res, next) {
  const  updateData = req.body;
  updateData.seat = JSON.parse(updateData.seat) // 数组需要以JSON字符串传输
  const data = await theaterService.update(updateData);
  res.send(data);
});

module.exports = router;

