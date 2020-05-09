const scheduleModule = require('./module/scheduleModule.js');
const movieModule = require('./module/movieModule.js');
const cinemaModule = require('./module/cinemaModule.js');
const theaterModule = require('./module/theaterModule.js');
module.exports = {
    get: async ({ limit, page, condition }) => {
        if (!condition) {
            limit = ~~limit;
            page = ~~page;
            const count = await scheduleModule.countDocuments();
            const data = await scheduleModule
                .find()
                .populate("movieId", ['cname'])
                .populate('cinemaId', ['name', 'address'])
                .populate('theaterId', ['name', 'seat'])
                .skip((page - 1) * limit)
                .limit(limit).lean()
            return { code: 0, msg: '', count, data };
        }else{
            // if(condition.all){
            //     return await scheduleModule
            //         .find()
            //         .populate("movieId", ['cname'])
            //         .populate('cinemaId', ['name', 'address'])
            //         .populate('theaterId', ['name', 'seat'])
            // }
        }
    },
    add: async (dataAdd) => {
        dataAdd.price = ~~dataAdd.price;
        await scheduleModule.create(dataAdd);
        return { statu: true, msg: '添加成功' };
    },
    del: async ({ _id }) => {
        await scheduleModule.deleteOne({ _id });
        return { statu: true, msg: '删除成功' };
    },
    update: async (dataUpdate) => {
        dataUpdate.price = ~~dataUpdate.price;
        const one = await scheduleModule.findOne({ _id: dataUpdate._id });
        Object.assign(one, dataUpdate);
        await one.save();
        return { statu: true, msg: '更新成功' };
    }
}