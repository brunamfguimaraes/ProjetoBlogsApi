const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; 

const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = ({ email }) => jwt.sign({ email }, secret, jwtConfig);
