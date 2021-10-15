const express = require('express');
const validateNewUser = require('../middlewares/validations/newUser');
const { createJWT, validateJWT } = require('../middlewares/tokenJWT');
const userController = require('../controllers/userControler');

const router = express.Router();

router.post('/', validateNewUser, createJWT, userController.postNewUser);
router.get('/', validateJWT, userController.getAll);
router.get('/:id', validateJWT, userController.getById);

module.exports = router;
