const theaterDao = require('../dao/theater.js');

module.exports = {
    get: async ({ limit, page, condition }) => await theaterDao.get({ limit, page, condition }),
    add: async ({ status, name, seat, cinemaId }) => await theaterDao.add({ status, name, seat, cinemaId }),
    del:async({  _id })=>await theaterDao.del({ _id }),
    update: async (updateData) => await theaterDao.update(updateData)
}