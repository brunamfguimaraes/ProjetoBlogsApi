const RequestError = require('../helper/customErrors');

let err;

const validationCategory = (res, name) => {
     if (!name) {
        err = { status: 400, message: '"name" is required' };
        RequestError(res, err);
     }
};

module.exports = { validationCategory };