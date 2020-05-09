

const movieModule = require("./module/movieModule.js")
const dao = {};
// 查
dao.get = async function ({ limit, page, condition }) {
    
    if(!condition){ // 普通查没有条件condition
        page = ~~page;
        limit = ~~limit;
        const data = await movieModule.find().skip((page - 1) * limit).limit(limit);
        const count = await movieModule.countDocuments();
        return { "code": 0, "msg": "", count, data }
    }else{  // 带条件查询 以条件优先
        if (condition._id) {  //存在_id 字段，说明只需要一条数据
            return await movieModule.find({ _id: condition._id })
        }else{
            if(condition.all){  //有all字段，表示 全部都要拿到  
                return await movieModule.find()
            }
        }
    }
}

// 增
dao.add = async function (addData) {
    addData.type = JSON.parse(addData.type);
    addData.episode = JSON.parse(addData.episode);
    await movieModule.create(addData);
    return {statu: true, msg:'添加成功'}
}

// 删
dao.del = async function ({_id}) {
    await movieModule.deleteOne({_id})
    return { statu: true, msg: '删除成功' }
}

// 改
dao.update = async function (updateData) {
    updateData.type = JSON.parse(updateData.type)
    updateData.episode = JSON.parse(updateData.episode)
    const doc = await movieModule.findOne({ _id: updateData._id})
    Object.assign(doc, updateData)
    await doc.save()
    return {statu: true, msg:'修改成功'}
}

module.exports = dao