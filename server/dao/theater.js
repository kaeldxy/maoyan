const theaterModule = require('./module/theaterModule.js');
const cinemaModule = require('./module/cinemaModule.js');
module.exports = {
    get: async ({ limit, page, condition }) => {
        if(condition){
            if(condition.cinemaId){
                const all = await theaterModule.find().lean();
                const doc = all.filter(item => item.cinemaId == condition.cinemaId);
                return doc;
            } else if (condition.all){
                const data = await 
                theaterModule
                .find()
                .populate('cinemaId', ['name']);
                return data;
            }
        }else{
            limit = ~~limit;
            page = ~~page;
            const data = await theaterModule
            .find()
            .populate('cinemaId', ['name'])
            .skip((page - 1) * limit)
            .limit(limit).lean();
            const count = await theaterModule.countDocuments();
            return { "code": 0, "msg": "", count, data }
        }
    },
    add: async ({ name, status, seat, cinemaId }) => {
        const doc = await theaterModule.create({ name, status, seat, cinemaId });
        return {statu:true, msg: '添加成功'};
    },
    del:async ({ _id }) => {
        await theaterModule.remove({ _id });
        return { statu: true, msg: '删除成功' }
    },
    update: async (updateData) => {
        const doc = await theaterModule.findOne({ _id: updateData._id});
        Object.assign(doc, updateData);
        await doc.save();
        return { statu: true, msg: '更新成功' }
    }
}