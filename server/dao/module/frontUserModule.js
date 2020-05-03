const mongoose = require('mongoose');
const frontUserSchema = mongoose.Schema({//骨架，结构
    userName: String, // 用户员账号
    pwd: String, // 用户密码
    lastTime: String,  //最近一次的登陆时间
}, { versionKey: false });
const frontUserModule = mongoose.model('frontusers', frontUserSchema);//创建模型

module.exports = frontUserModule;