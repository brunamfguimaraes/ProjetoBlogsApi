const loginServices = require('../services/loginServices');
require('dotenv');

const login = async (req, res) => {
  try {
    const newUser = await loginServices.login(req.body);
    if (newUser.error) {
      const { status, message } = newUser.error;
      return res.status(status).json({ message });
    }
    res.status(201).json({ ...newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

module.exports = {
  login,
};