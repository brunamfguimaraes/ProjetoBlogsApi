const { StatusCodes } = require('http-status-codes');

const Login = require('../services/Login');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const token = await Login.login(email, password);
  if (token.errMsg) {
    return next({
      codeErr: token.codeErr,
      errMsg: token.errMsg,
    });
  }

  res.status(StatusCodes.OK).json(token);
};

module.exports = {
  login,
};
