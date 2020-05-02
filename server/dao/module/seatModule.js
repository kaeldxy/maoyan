const mongoose = require('mongoose');
const seatSchema = mongoose.Schema({//骨架，结构
    row: Number, // 座位⾏号
    col: Number, // 座位列号
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'theater' } // 座位所从属的放映厅
}, { versionKey: false });
const seatModule = mongoose.model('seats', seatSchema);//创建模型

module.exports = seatModule;