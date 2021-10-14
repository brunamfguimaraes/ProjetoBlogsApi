const userService = require('../services/userServices');

const jwtValidation = require('../middlewares/jwtValidation');

const secret = 'meusecretdetoken';

const jwtConfig = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

const create = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.create(userData);

    const token = jwtValidation(user, jwtConfig, secret);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = create;