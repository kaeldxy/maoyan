const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({  //骨架，结构
    cname: String, // 电影中文名
    ename: String, // 电影英⽂名
    type: [String], // 电影的类型 用数组保存，因为有可能有更多类型
    area: String, // 电影⾸映地区
    poster: String, //电影海报 图片地址
    time: String, //电影时⻓ 单位分钟
    upDate: String, // 电影⼤陆上映时间,
    UserScore: String, // 用户评分
    professionScore: String, //专业评分
    count: String, // 电影票房
    intro: String, // 剧情简介
    isClassic: Boolean, // 是否是经典
    isHotShow: Boolean, //是否正在热映
    isHotPlay: Boolean, //是否是热播电影
    Sharpness: String, //电影清晰度类型  比如3D 3DMAX 2D 没有就是Null
    director: String,
    actor: String,
    episode: [String] // 剧集数组:每⼀项是⼀个图⽚路径字符串 5张图片 一张大图一张小图
}, { versionKey: false });
const movieModule = mongoose.model('movies', movieSchema);//创建模型

module.exports =  movieModule;