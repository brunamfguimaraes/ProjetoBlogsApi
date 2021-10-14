// const jwt = require('jsonwebtoken');
// const rescue = require('express-rescue');

// require('dotenv').config();

// const secret = process.env.JWT_SECRET;

// const jwtConfiguration = {
//     expiresIn: '1d',
//     algorithm: 'HS256',
// };

// const token = rescue(async (req, _res) => {
//     const { id, displayName, email, image } = req.body;
//     const tokenSign = jwt.sign({ data: { id, email, displayName, image }, secret, jwtConfiguration });
//     return tokenSign;
// });

// module.exports = token;