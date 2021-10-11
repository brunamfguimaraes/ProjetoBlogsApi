const rescue = require('express-rescue');
const service = require('./userService');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await service.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login({ email, password });
  res.status(200).json({ token });
});

module.exports = {
  create,
  login,
};
