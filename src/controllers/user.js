const service = require('../services/user');

async function newUser(req, res) {
  const { displayName, email, password, image } = req.body;
  const result = await service.newUser(displayName, email, password, image);
  return res.status(201).json({ token: result });
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await service.login(email, password);
  return res.status(200).json({ token: result });
}

// async function getUsers(req, res) {
  
// }

module.exports = {
  newUser,
  login,
  // getUsers,
};
