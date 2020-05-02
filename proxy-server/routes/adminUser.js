var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/get', function (req, res, next) {
    console.log('get');
    res.send('respond with a resource');
});
router.post('/del', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/add', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/update', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/reg', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;