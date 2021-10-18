const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/LoginService');

const postLogin = async (req, res) => {
  const userResult = await loginService.login(req.body);

  if (userResult.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: userResult.error.message,
    });
  }

  return res.status(StatusCodes.OK).json({ token: userResult });
};

module.exports = postLogin;
