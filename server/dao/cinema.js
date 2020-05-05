const cinemaModule = require('./module/cinemaModule.js');
module.exports = {
    get: async ({ limit, page, condition }) => {
        limit = ~~limit;
        page = ~~page;
        let data;
        const count = await cinemaModule.count();
        if(!condition){
            data = await cinemaModule.find({}).skip((page - 1) * limit).limit(limit);
        }else{
            data = {}
        }
        return { code: 0, msg: '', count, data };
    },
    add: async (dataAdd) => {
        await cinemaModule.create(dataAdd);
        return {statu: true, msg: '添加成功'};
    },
    del: async ({ _id }) => {
        await cinemaModule.deleteOne({_id});
        return {statu: true, msg: '删除成功'};
    },
    update: async (dataUpdate) => {
        const one = await cinemaModule.findOne({ _id: dataUpdate._id});
        Object.assign(one, dataUpdate);
        await one.save();
        return{statu:true, msg:'更新成功'};
    }
}