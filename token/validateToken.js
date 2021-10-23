const jwt = require('jsonwebtoken');
const RequestError = require('../helper/customErrors');

const segredo = '3pJBM8$g2sJg';
let err;
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!token) {
    err = { status: 401, message: 'Token not found' };
    RequestError(res, err);
  }
    try {
      const decoded = jwt.verify(token, segredo);
      if (!decoded) {
        err = { status: 401, message: 'Expired or invalid token' };
        RequestError(res, err);
      }
      next();
    } catch (error) {
        err = { status: 401, message: 'Expired or invalid token' };
        RequestError(res, err);
    }
};