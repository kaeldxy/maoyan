const cinemaDao = require('../dao/cinema.js')
module.exports = {
    get: async ({ limit, page, condition }) => await cinemaDao.get({ limit, page, condition }),
    add: async (dataAdd) => await cinemaDao.add(dataAdd),
    del: async ({ _id }) => await cinemaDao.del({ _id }),
    update: async (dataUpdate) => await cinemaDao.update(dataUpdate)
}