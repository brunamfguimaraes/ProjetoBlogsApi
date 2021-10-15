const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');

const loginRouter = express.Router();
const { creatorToken } = require('../helpers/token');
const { checkUserExist } = require('../services/loginService');
const loginValidate = require('../middlewares/loginValidate');

loginRouter.post('/',
  loginValidate,
  rescue(async (req, res) => {
    const { email } = req.body;
    const checkEmail = await checkUserExist(email);
    if (checkEmail.isError) {
      return res.status(checkEmail.code).json({ message: checkEmail.message });
    }
    const token = await creatorToken(req.body);
    return res.status(StatusCodes.OK).json({ token });
  }));

  module.exports = loginRouter;