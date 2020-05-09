const mongoose = require('mongoose');
const theaterSchema = mongoose.Schema({//骨架，结构
    name: String, // 放映厅名字
    status: String, // 放映厅是否营业（可选）
    seat: [Boolean], //
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'cinemas'}, //存所从属的影院ID  
}, { versionKey: false });
const theaterModule = mongoose.model('theaters', theaterSchema);//创建模型

module.exports = theaterModule;