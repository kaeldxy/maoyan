const orderModule = require('./module/orderModule.js');
// const frontUserModule = require('./module/frontUserModule.js');
// const schedulesModule = require('./module/schedulesModule.js');


module.exports = {
    get: async ({ limit, page, condition }) => {
        // let data;
        if (condition){
            if (condition.scheduleId){
                const alldata = await orderModule.find().lean();
                const data = alldata.filter(item => item.scheduleId == condition.scheduleId);
                return data;
            }
        }else{
            limit = ~~limit;
            page = ~~page;
            const data = await
            orderModule.find()
            .populate("frontUserId", ["userName"])
            .populate({
                path: 'scheduleId',
                select: 'showTime price row col',
                populate: [
                    {
                        path: 'movieId',
                        select: 'cname',
                    },
                    {
                        path: 'cinemaId',
                        select: 'name address',
                    },
                    {
                        path: 'theaterId',
                        select: 'name',
                    }
                ]
            })
            .skip((page - 1) * limit)
            .limit(limit).lean();
            let count = await orderModule.count();
            return { "code": 0, "msg": "", count, data }
        }
        
        

        
    },
    add: async (addDtaa) => { /// frontUserId  scheduleId   row   col  
        await orderModule.create(addDtaa);
        return { statu: true, msg: "添加成功"}
    },
    del: async ({ _id }) => {
        await orderModule.remove({ _id });
        return { statu: true, msg: '删除成功'}
    },
    update: async (updateData) => {
        const doc = await orderModule.findOne({ _id: updateData._id});
        Object.assign(doc, updateData);
        await doc.save();
        return {statu: true, msg: '更新成功'}
    }
}