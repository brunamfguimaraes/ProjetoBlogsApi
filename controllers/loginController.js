const rescue = require('express-rescue');
const { User } = require('../models');
const { jwtLogin } = require('../api/auth/tokenJWT');

const login = rescue(async (req, res) => {
  const { body } = req;
  const loginResult = await User.findOne({ where: { email: body.email } });

  const { id, email } = loginResult;
  const payload = { id, email };
  const token = jwtLogin(payload);
  return res.status(200).json({ token });
});

module.exports = { login };
