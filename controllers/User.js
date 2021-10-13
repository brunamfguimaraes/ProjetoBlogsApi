const express = require('express');

const User = require('../services/User');
const userValidator = require('../middlewares/userValidator');
const { CREATED } = require('../utils/statusCode');

const router = express.Router();
router.use(express.json());

router.post('/',
  userValidator.validateDisplayName,
  userValidator.validateEmail,
  userValidator.validatePassword,
  userValidator.validateUserExists,
  async (req, res) => {
    const user = await User.create(req.body);

    return res.status(CREATED).json(user);
  });

module.exports = router;