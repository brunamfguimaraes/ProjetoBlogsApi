const express = require('express');

const {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
  getAllUsers,
  getOneUser,
  deleteSelfUser,
} = require('../controllers/userController');

const { generateJWT, validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', verifyFieldsEmpty,
  verifyFieldsLength, verifyEmail, verifyRegisteredUser, createUser, generateJWT);

router.get('/', validateJWT, getAllUsers);

router.get('/:id', validateJWT, getOneUser);

router.delete('/me', validateJWT, deleteSelfUser);

module.exports = router;
