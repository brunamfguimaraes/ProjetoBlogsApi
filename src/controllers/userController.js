const userService = require('../services/userService');

async function create(req, res) {
  try {
    const { body } = req;
    const { token } = req;

    const newUser = await userService.create(body);
    if (!newUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    return res.status(201).json({ token });
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  create,
};