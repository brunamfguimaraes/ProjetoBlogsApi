const express = require('express');

const router = express.Router();

const { getById, getAll, createUser } = require('../controllers/userController');

const { 
  validateDisplayName,
   validatePassword,
    validateEmail, 
 } = require('../middlewares/userValidations');

 const jwtValidations = require('../middlewares/jwtValidations');

router.get('/:id', jwtValidations, getById);
router.post('/', validateDisplayName, validatePassword, validateEmail, createUser);
router.get('/', jwtValidations, getAll);

module.exports = router;