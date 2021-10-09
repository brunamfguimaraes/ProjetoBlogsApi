const rescue = require('express-rescue');

const { createUserService } = require('../service/userService');

const createUser = rescue(async (req, res, _next) => {
  const { token } = req;
  await createUserService(req.body);
  return res.status(201).json({ token });
});

module.exports = {
  createUser,
};
