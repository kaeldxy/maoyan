var express = require('express');
var router = express.Router();
const { crypt, secret } = require('../utils/encrypt.js');
const rp = require('request-promise');
const {target} = require('../utils/autoRequest.js');
const jwt = require("jsonwebtoken");
/* GET users listing. */

router.post('/login', async function (req, res, next) {
    let {userName, pwd, userType} = req.body;
    console.log('proxy/login');
    
    //加密
    pwd = crypt(pwd);
    //转发
    const data = await rp({
        method: 'POST',
        uri: target + "/user/login",
        body: {userName, pwd, userType},
        json: true // Automatically stringifies the body to JSON
    })
    // 下发jwt
    res.send(data);
});
router.post('/reg', async function (req, res, next) {
    let { userName, pwd, userType } = req.body;
    //加密
    pwd = crypt(pwd);
    //转发
    const data = await rp({
        method: 'POST',
        uri: target + "/user/reg",
        body: { userName, pwd, userType },
        json: true // Automatically stringifies the body to JSON
    })
    
    res.send(data);
});
module.exports = router;