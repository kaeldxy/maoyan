
var express = require('express');
var router = express.Router();
const { rootPath } = require('../utils/baseinfo.js')
const multer = require('multer');
const path = require("path")
const fs = require("fs");


const upload = multer({ dest: path.join(rootPath, "/public/images/poster") });//** 


/* GET users listing. */ // 我这里就不做分层：我懒、这里只有两层
router.post('/upload', upload.single('poster'), async function (req, res, next) {//** 
    const originalname = req.file.path;
    const newname = originalname + path.extname(req.file.originalname);

    fs.rename(originalname, newname, error => {
        if (error) throw error;
        const responsename = newname.replace(rootPath + `${path.sep}public${path.sep}`, "");
        
        res.send({ statu: true, path: responsename});
    })

});

module.exports = router;