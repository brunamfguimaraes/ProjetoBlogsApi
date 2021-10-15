const service = require('../services/user');

async function newUser(req, res) {
  const { displayName, email, password, image } = req.body;
  const result = await service.newUser(displayName, email, password, image);
  return res.status(201).json({ token: result });
}

module.exports = {
  newUser,
};
