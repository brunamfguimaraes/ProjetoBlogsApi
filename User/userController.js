const rescue = require('express-rescue');
const service = require('./userService');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await service.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

module.exports = {
  create,
};
