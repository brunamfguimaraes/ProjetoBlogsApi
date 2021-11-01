const express = require('express');

const usersController = require('../controllers/usersController');
const JWTValidation = require('../middlewares/JWTValidation');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router
  .post('/', usersController.createUser)
  .get('/', JWTValidation, usersController.getAllUsers)
  .get('/:id', JWTValidation, usersController.getUserById)
  .delete('/me', JWTValidation, usersController.deleteUser);

router.use(errorMiddleware);

module.exports = router;