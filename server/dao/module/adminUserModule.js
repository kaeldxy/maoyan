const mongoose = require('mongoose');
const adminUserSchema = mongoose.Schema({//骨架，结构
    userName: String, // 管理员账号
    pwd: String, // 管理员密码
    lastTime: String,  //最近一次的登陆时间
}, { versionKey: false });
const adminUserModule = mongoose.model('adminusers', adminUserSchema);//创建模型
// console.dir(adminUserModule);

module.exports = adminUserModule;