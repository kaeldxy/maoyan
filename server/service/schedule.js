const scheduleDao = require('../dao/schedule.js')
module.exports = {
    get: async ({ limit, page, condition }) => await scheduleDao.get({ limit, page, condition }),
    add: async (dataAdd) => await scheduleDao.add(dataAdd),
    del: async ({ _id }) => await scheduleDao.del({ _id }),
    update: async (dataUpdate) => await scheduleDao.update(dataUpdate)
}