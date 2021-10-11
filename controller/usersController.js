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

const loginUser = async (req, res) => {
  const { body } = req;

  const login = await usersService.loginUser(body);

  if (login.details) {
    return res.status(400).json({ message: login.details[0].message });
  }

  if (login === 'invalidData') {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json({ token: login });
};

module.exports = {
  createUser,
  loginUser,
};