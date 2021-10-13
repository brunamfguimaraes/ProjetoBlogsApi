const { userLogin: login } = require('../services/loginService');
const middlewares = require('../middlewares');

const userLogin = async (req, res, next) => {
  const { error } = middlewares.validationLogin(req.body);
  if (error) return next(error);

  const token = await login(req.body);
  if (token.message) return res.status(token.statusCode).json({ message: token.message });
  
  return res.status(200).json({ token });
};

module.exports = {
  userLogin,
};