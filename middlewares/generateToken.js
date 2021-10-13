const JWT = require('jsonwebtoken');
require('dotenv').config();

module.exports = (payload) => {
  JWT.sign(payload, process.env.JWT_SECRET);
};