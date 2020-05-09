var express = require('express');
var router = express.Router();

var app = express()

const movieService = require("../service/movie.js")

// 查
router.get('/get', async function (req, res, next) {
    
    const { limit, page, condition } = req.query;
    res.send(await movieService.get({ limit, page, condition }))
    
});

// 增
router.post('/add', async function (req, res, next) {
    const addData = req.body
    res.send(await movieService.add(addData));
});

// 删
router.post('/del', async function (req, res, next) {
    const {_id} = req.body
    res.send(await movieService.del({_id}));
});

// 改
router.post('/update', async function (req, res, next) {
    const updateData = req.body;
    res.send(await movieService.update(updateData));
});
module.exports = router;
