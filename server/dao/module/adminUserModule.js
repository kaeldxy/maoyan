const mongoose = require('mongoose');
const adminUserSchema = mongoose.Schema({//骨架，结构
    adminUserName: String, // 管理员账号
    adminUserPassword: String // 管理员密码
}, { versionKey: false });
const adminUserModule = mongoose.model('adminUsers', adminUserSchema);//创建模型

module.exports = adminUserModule;