const rescue = require('express-rescue');
const { checkLoginData } = require('../service/loginService');
const { tokenGenerator } = require('../utils/createToken');

const login = rescue(async (req, res) => {
  await checkLoginData(req.body);
  const token = await tokenGenerator(req.body);
  return res.status(200).json({ token });
});

module.exports = { login };
