const orderDao = require('../dao/order.js');

module.exports = {
    get: async ({  limit, page, condition }) => await orderDao.get({ limit, page, condition }),
    add: async (addDtaa) => await orderDao.add(addDtaa),
    del: async({  _id })=>await orderDao.del({ _id }),
    update: async (updateData) => await orderDao.update(updateData)
}