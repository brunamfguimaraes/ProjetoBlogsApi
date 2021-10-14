const { createUser } = require('../services/userService');
const { token } = require('../auth/token');

const user = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await createUser(displayName, email, password, image);

  if (create.error) return res.status(400).json({ message: create.err.message });
  if (create.error2) return res.status(409).json({ message: 'User already registered' });

  const newToken = await token(req.body);
  return res.status(201).json({ token: newToken });
};

module.exports = {
  user,
}; 