const router = require('express').Router();
const middlewares = require('../middlewares');
const { createUser, getUsers } = require('../controllers/usersController');

router.post('/', createUser);
router.get('/', middlewares.validateJWT, getUsers);

module.exports = router;