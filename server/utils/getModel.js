module.exports = function (userType, modelObj) {
    for (const key in modelObj) {
        if (new RegExp(userType).test(key)) {
            return modelObj[key];
        }
    }
}