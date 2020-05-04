var express = require('express');
var router = express.Router();
const { crypt, secret } = require('../utils/encrypt.js');
const rp = require('request-promise');
const {target} = require('../utils/autoRequest.js');
const jwt = require("jsonwebtoken");
/* GET users listing. */
router.post('/getpayload', function (req, res, next) {
    res.send(req.user);
})
router.post('/login', async function (req, res, next) {
    let {userName, pwd, userType} = req.body;
    //加密
    pwd = crypt(pwd);
    //转发
    const data = await rp({
        method: 'POST',
        uri: target + "/user/login",
        body: {userName, pwd, userType},
        json: true // Automatically stringifies the body to JSON
    })
    let token;
    if(data.statu){
        token = jwt.sign(
            {userName},
            secret,
            {
                expiresIn: 60 * 60 // 秒
            }
        );
        Object.assign(data, {token});
    }
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