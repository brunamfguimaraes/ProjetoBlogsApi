const JWT = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => JWT.sign(payload, process.env.JWT_SECRET);

module.exports = generateToken;