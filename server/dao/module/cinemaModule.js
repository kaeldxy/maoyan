const mongoose = require('mongoose');
const cinemaSchema = mongoose.Schema({//骨架，结构
    name: String, // 影院名称
    address: String, // 影院地址
    phone: String, // 影院联系⽅式
    status: String, // 影院是否营业（可选）
    posterSrc: String, // 影院封面图地址 //
}, { versionKey: false });
const cinemaModule = mongoose.model('cinemas', cinemaSchema);//创建模型

module.exports = cinemaModule;