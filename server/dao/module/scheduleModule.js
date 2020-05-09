const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({//骨架，结构
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movies' }, // 电影 id
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'cinemas' }, // 影院 id
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'theaters' }, // 放映厅 id
    showTime: String, // 放映时间 id
    price: Number, // 价格
}, { versionKey: false });
const scheduleModule = mongoose.model('schedules', scheduleSchema);//创建模型

module.exports = scheduleModule;