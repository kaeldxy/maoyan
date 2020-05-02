const mongoose = require('mongoose');
const theaterSchema = mongoose.Schema({//骨架，结构
    name: String, // 放映厅名字
    status: Boolean, // 放映厅是否营业（可选）
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'cinema'}, // 放映厅从属的影院 id  关联查询
}, { versionKey: false });
const theaterModule = mongoose.model('theaters', theaterSchema);//创建模型

module.exports = theaterModule;