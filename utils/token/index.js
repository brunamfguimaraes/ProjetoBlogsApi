const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; 

const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = ({ id, email }) => jwt.sign({ id, email }, secret, jwtConfig);
