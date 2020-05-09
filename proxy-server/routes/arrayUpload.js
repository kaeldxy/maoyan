const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")
const fs = require("fs");

const { rootPath } = require("../utils/baseinfo.js")

const episodeUpload = multer({ dest: path.join(rootPath, "/public/images/episode") });


/* GET users listing. */ // 我这里就不做分层：我懒、这里只有两层
router.post('/episode', episodeUpload.array('episode', 5), async function (req, res, next) {
	const files = req.files;
	const len = files.length;
	const patharr = [];
 	(async function name() {
		for (let i = 0; i < len; i++) {
			const item = files[i];
			const originalname = item.path;
			const newname = originalname + path.extname(item.originalname);
			const responsename = await new Promise((r) => {
				fs.rename(originalname, newname, error => {
					if (error) throw error;
					const responsename = newname.replace(rootPath + `${path.sep}public${path.sep}`, "");
					r(responsename)
				})
			})
			patharr.push(responsename);
		}
		res.send(patharr);
	})()
	
});
module.exports = router;