var express = require('express');
var router = express.Router();
const userService = require('../service/user.js');
const rp = require('request-promise');
const { crypt} = require('../utils/encrypt.js');
/* GET users listing. */
router.post('/login', async function (req, res, next) {
  const { userName, pwd, userType } = req.body;
  const data = await userService.login({ userName, pwd, userType});
  res.send(data);
});
router.post('/reg', async function (req, res, next) {
  const { userName, pwd, userType } = req.body;
  const data = await userService.reg({ userName, pwd, userType});
  res.send(data);
});

router.get('/get', async function (req, res, next) {
  let { condition, limit, page, userType} = req.query;
  const data = await userService.get({ condition, limit, page, userType});
  res.send(data);
});
router.post('/del', async function (req, res, next) {
  let { _id, pwd, userType} = req.body;
  pwd = crypt(pwd);
  const data = await userService.del({ _id, pwd, userType});
  res.send(data);
});
router.post('/add', async function (req, res, next) {
  let { userName, pwd, userType } = req.body;
  pwd = crypt(pwd);
  const data = await rp({
    method: 'POST',
    uri: "http://localhost:4000/user/reg",
    body: { userName, pwd, userType},
    json: true // Automatically stringifies the body to JSON
  })
  res.send(data);
});
router.post('/update', async function (req, res, next) {
  let { _id, userName, oldPwd, newPwd,  userType} = req.body;
  oldPwd = crypt(oldPwd);
  newPwd = crypt(newPwd);
  const data = await userService.update({ _id, userName, oldPwd, newPwd, userType});
  res.send(data);
});
module.exports = router;

