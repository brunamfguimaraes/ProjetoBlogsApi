const usersService = require('../service/usersService');

const createUser = async (req, res) => {
  const { body } = req;

  const user = await usersService.createUser(body);

  if (user.details) {
    return res.status(400).json({ message: user.details[0].message });
  }

  if (user === 'emailExists') {
    return res.status(409).json({ message: 'User already registered' });
  }

  return res.status(201).json({ token: user });
};

module.exports = {
  createUser,
};