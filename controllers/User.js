const express = require('express');

const User = require('../services/User');
const userValidator = require('../middlewares/userValidator');
const tokenValidator = require('../middlewares/tokenValidator');
const { SUCCESS, CREATED, NOT_FOUND } = require('../utils/statusCode');
const isError = require('../utils/isError');

const router = express.Router();

router.post('/',
  userValidator.validateDisplayName,
  userValidator.validateEmail,
  userValidator.validatePassword,
  userValidator.validateUserExists,
  async (req, res) => {
    const user = await User.create(req.body);

    return res.status(CREATED).json(user);
  });

router.get('/',
  tokenValidator.validateToken,
  async (_req, res) => {
    const users = await User.findAll();

    return res.status(SUCCESS).json(users);
  });

router.get('/:id',
  tokenValidator.validateToken,
  async (req, res) => {
    const user = await User.findByPk(req.params);

    if (!user) return isError(res, NOT_FOUND, 'User does not exist');

    return res.status(SUCCESS).json(user);
  });

module.exports = router;