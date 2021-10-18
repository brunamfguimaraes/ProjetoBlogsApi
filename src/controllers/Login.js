const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status');
const Login = require('../services/Login');

const attempLogin = async (req, res) => {
  try {
    const { body: loginInfo } = req;
    const result = await Login.attempLogin(loginInfo);

    return result.message
      ? res.status(BAD_REQUEST).json(result)
      : res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports = { attempLogin };