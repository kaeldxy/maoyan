const userDao = require('../dao/user.js');
module.exports = {
    login: async ({ userName, pwd, userType }) => await userDao.login({ userName, pwd, userType }),
    reg: async ({ userName, pwd, userType }) => await userDao.reg({ userName, pwd, userType }),
    get: async ({ condition, limit, page, userType }) => await userDao.get({ condition, limit, page, userType}),
    del: async ({ _id, pwd, userType }) => await userDao.del({ _id, pwd, userType}),
    update: async ({ _id, oldPwd, newPwd, userName, userType }) => await userDao.update({ _id, oldPwd, newPwd, userName, userType}),
}