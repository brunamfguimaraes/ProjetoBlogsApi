const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../middlewares/jwt');
const { User } = require('../models');

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
    }
    const token = generateToken(userExists.id, userExists.email);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = userLogin;