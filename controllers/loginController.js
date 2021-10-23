const loginServices = require('../services/loginServices');
require('dotenv');

const login = async (req, res) => {
  try {
    const user = await loginServices.login(req.body);
    if (user.error) {
      const { status, message } = user.error;
      return res.status(status).json({ message });
    }
    res.status(200).json({ ...user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

module.exports = {
  login,
};