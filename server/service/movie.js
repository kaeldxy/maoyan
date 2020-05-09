const movieDao = require("../dao/movie.js");
const service = {};
// 查、、
service.get = async ({ limit, page, condition }) => {
    return await movieDao.get({ limit, page, condition })
}

// 增
service.add = async (addData) => {
    return await movieDao.add(addData)
 }

 // 删
 service.del = async ({_id}) => {
     return await movieDao.del({_id})
 }

// 改
service.update = async (updateData) => {
    return await movieDao.update(updateData)
 }

module.exports = service