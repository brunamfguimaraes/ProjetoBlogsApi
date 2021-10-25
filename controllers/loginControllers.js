const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const generateToken = require('../middlewares/jwtGenerate');
const loginServices = require('../services/loginServices');

const createLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
    }
    const user = await loginServices.createLogin(req.body);
    const userData = { id: user.id, email: user.email };
    const token = generateToken(userData);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { createLogin };