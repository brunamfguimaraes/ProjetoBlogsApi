const express = require('express');
const userControllers = require('../controllers/userControllers');
const { validateJWT } = require('../middlewares/jwt');
const validateUser = require('../middlewares/userValidation');

const router = express.Router();

router.get('/:id', validateJWT, userControllers.findUser);

router.post('/', validateUser, userControllers.addUser);
router.get('/', validateJWT, userControllers.getAll);

module.exports = router;
