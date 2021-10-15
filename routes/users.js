const router = require('express').Router();
const middlewares = require('../middlewares');
const { 
  createUser, 
  getUsers, 
  getUserById, 
  removeMe,
} = require('../controllers/usersController');

router.post('/', createUser);
router.get('/', middlewares.validateJWT, getUsers);
router.get('/:id', middlewares.validateJWT, getUserById);
router.delete('/me', middlewares.validateJWT, removeMe);

module.exports = router;