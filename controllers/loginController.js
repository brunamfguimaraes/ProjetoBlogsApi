const loginServices = require('../services/loginServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginServices.login(email, password);
  return res.status(200).json(result);
};

module.exports = {
  login,
};