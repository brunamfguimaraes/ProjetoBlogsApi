const loginService = require('../services/loginService');

const login = async (req, res) => {
  const result = await loginService.login(req.body);
  if (result.code) { 
    return res.status(result.code).json({ message: result.message }); 
  }
  return res.status(200).json({ token: result });
};

module.exports = {
  login,
};