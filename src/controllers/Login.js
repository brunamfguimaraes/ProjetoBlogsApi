const services = require('../services/Login');
const { createToken } = require('../auth');

const loginController = async (req, res) => {
  try {
    const user = req.body;

    const validUser = await services.loginService(user);

    delete validUser.password;

    const token = createToken(validUser);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  loginController,
};
