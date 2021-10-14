const express = require('express');

const {
  makeLogin,
  verifyEmptyFields,
  verifyBlankFields,
} = require('../controllers/loginController');

const { generateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', verifyBlankFields, verifyEmptyFields,
  makeLogin, generateJWT);

module.exports = router;
