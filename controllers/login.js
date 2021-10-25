const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { userMailLogin, userPasswordLogin, validateUser } = require('../midlewares');

const router = express.Router();

const secret = 'secretToken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const ALGO_DEU_ERRADO = 'Algo deu errado';

router.post('/', userMailLogin, userPasswordLogin, validateUser, async (req, res) => {
    const { email } = req.body;
    try {
      const { dataValues } = await User.findOne({ where: { email } });
      delete dataValues.password;
      const token = jwt.sign({ data: dataValues }, secret, jwtConfig);
      return res.status(200).json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: ALGO_DEU_ERRADO });
    }
  });
  
module.exports = router;