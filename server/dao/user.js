const adminUserModule = require('./module/adminUserModule.js');
const frontUserModule = require('./module/frontUserModule.js');
const getModel = require('../utils/getModel.js');
const userModule = {
    adminUserModule,
    frontUserModule
}

module.exports = {
    login: async ({ userName, pwd, userType}) => {
        const model = getModel(userType, userModule);
        const data = await model.findOne({ userName, pwd});
        if (data) {
            const date = new Date();
            const lastTime = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分';
            data.lastTime = lastTime;
            await data.save();
        }
        return { statu: data ? true : false, msg: data ? '登陆成功' : '密码错误' }
    },
    reg: async ({ userName, pwd, userType}) => {
        const model = getModel(userType, userModule);
        const findData = await model.findOne({ userName }); // 如果没有是null
        if (!findData) {
            const data = await model.create({ userName, pwd, userType});
        }
        return { statu: findData ? false : true, msg: findData ? '你注册的账号已存在' : '注册成功' }
    },
    get: async ({ condition, limit, page, userType }) => {
        const model = getModel(userType, userModule);
        if (condition) {
            if (condition.all){  //存在all字段，就查 全部
                const data = await model.find({}, 'userName');
                return data;
            }
        } else {
            limit = ~~limit;
            page = ~~page;
            const data = await model.find({}, 'userName lastTime').skip((page - 1) * limit).limit(limit);
            const count = await model.countDocuments();
            return {
                "code": 0,
                "msg": "",
                count,
                data,
            }
        }
        
    },
    del: async ({ _id, pwd, userType}) => {
        const model = getModel(userType, userModule);
        let statu, msg;
        let state = true;
        const user = await model.findOne({ _id }).catch(err => {
            state = false;
            statu = false;
            msg = '此用户不存在';
        })
        if (state) {
            if (user) {
                if (user.pwd === pwd) {
                    await model.deleteOne(user);
                    statu = true;
                    msg = '删除成功';
                } else {
                    statu = false;
                    msg = '密码错误';
                }
            } else {
                statu = false;
                msg = '此用户不存在';
            }
        }
        return { statu, msg }
    },
    update: async ({ _id, oldPwd, newPwd, userName, userType }) => {
        const model = getModel(userType, userModule);
        const user = await model.findOne({ _id });
        let statu, msg;
        if (user) {
            if (user.pwd === oldPwd){
                Object.assign(user, { pwd: newPwd, userName });
                await user.save();
                statu = true;
                msg = '更新成功';
            }else{
                statu = false;
                msg = '密码错误';
            }
        } else {
            statu = false;
            msg = '此用户不存在';
        }
        return {statu, msg}
            
    }
}