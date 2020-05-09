var express = require('express');
var router = express.Router();
const orderService = require('../service/order.js');
/* GET users listing. */

router.get('/get', async function (req, res, next) {
  let { limit, page, condition } = req.query;
  
  const data = await orderService.get({ limit, page, condition });
  res.send(data);
})

router.post('/add', async function (req, res, next) {
  const addDtaa = req.body  // frontUserId  scheduleId   row   col
  const data = await orderService.add(addDtaa);
  res.send(data);
});

router.post('/del', async function (req, res, next) {

  const { _id } = req.body
  const data = await orderService.del({ _id });
  res.send(data);
});

router.post('/update', async function (req, res, next) {
  const updateData = req.body;
  const data = await orderService.update(updateData)
  res.send(data)
});

module.exports = router;

