const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'mySuperPassword';
const OK = 200;
const BAD_REQUEST = 400;
// const INTERNAL_SERVER_ERROR = 500;

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const findUserLogin = async (req, res) => {
  const { email } = req.body;
  const { dataValues } = await User.findOne({ where: { email } });
  delete dataValues.password;
  const token = jwt.sign({ data: dataValues }, secret, jwtConfig);

  if (!token) {
    return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
  }

  return res.status(OK).json({ token });
};

module.exports = { findUserLogin };
