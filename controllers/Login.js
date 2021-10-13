const express = require('express');

const Login = require('../services/Login');
const loginValidator = require('../middlewares/loginValidators');
const { SUCCESS } = require('../utils/statusCode');

const router = express.Router();

router.post('/',
  loginValidator.validateEmail,
  loginValidator.validatePassword,
  loginValidator.validateUserExists,
  async (req, res) => {
    const token = await Login(req.body);

    return res.status(SUCCESS).json(token);
  });

module.exports = router;