const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const Token = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { data } = decoded;
    req.user = data;
    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Sorry, there is somethiing wrong :(');
  }
};

module.exports = { Token };