const mongoose = require('mongoose');
const theaterSchema = mongoose.Schema({//骨架，结构
    name: String, // 放映厅名字
    status: Boolean, // 放映厅是否营业（可选）
    seat:{
        row: Number, // 一共有多少行
        col: Number, // 一共有多少列
        empty: [
            {row: Number, col: Number}, // 表示空位, 第几行第几列是空的，可以多加
        ]
    },
}, { versionKey: false });
const theaterModule = mongoose.model('theaters', theaterSchema);//创建模型

module.exports = theaterModule;