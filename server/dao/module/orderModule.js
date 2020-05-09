const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({//骨架，结构
    frontUserId: { type: mongoose.Schema.Types.ObjectId, ref:'frontusers'}, // 这条订单 属于哪个前台用户的
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref:'schedules'},  // 这条订单的排片信息，存哪个排片。
    row: Number,
    col: Number
}, { versionKey: false });
const orderModule = mongoose.model('orders', orderSchema);//创建模型

module.exports = orderModule;