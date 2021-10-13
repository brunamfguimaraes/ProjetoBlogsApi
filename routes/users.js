const router = require('express').Router();
const middlewares = require('../middlewares');
const { createUser, getUsers, getUserById } = require('../controllers/usersController');

router.post('/', createUser);
router.get('/', middlewares.validateJWT, getUsers);
router.get('/:id', middlewares.validateJWT, getUserById);

module.exports = router;