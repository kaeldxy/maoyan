const mongoose = require('mongoose');
const frontUserSchema = mongoose.Schema({//骨架，结构
    frontUserName: String, // 管理员账号
    frontUserPassword: String // 管理员密码
}, { versionKey: false });
const frontUserModule = mongoose.model('frontUsers', frontUserSchema);//创建模型

module.exports = frontUserModule;