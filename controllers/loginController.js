const HTTP_REST = require('../HTTPErrosAndMessages');

const { statusCode } = HTTP_REST;
const userService = require('../service/loginService');

// Preciso Validar o usuario fazer o login e entregar o token
const loginUser = async (req, res) => {
    const user = req.body;
   const response = await userService.loginUser(user);
   const { token } = response;
   if (token) {
    return res.status(statusCode.OK).json({ response });
   }
   return res.status(statusCode.WRONG_FORMAT).json(response);
};

module.exports = {
    loginUser,
};