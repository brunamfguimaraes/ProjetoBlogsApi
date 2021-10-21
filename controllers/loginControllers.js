const { StatusCodes } = require('http-status-codes');
const { jwt, jwtConfiguration } = require('../middlewares/jwt');
const { User } = require('../models');

const userLogin = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ email }, secret, jwtConfiguration);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = userLogin;