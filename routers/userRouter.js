const express = require('express');
const controllers = require('../controllers');
const { validatePasswordCreate, validateEmailCreate, validateToken } = require('../middlewares');

const router = express.Router();

router.post('/', validateEmailCreate, validatePasswordCreate, controllers.postUserController);
router.get('/', validateToken, controllers.getUsersController);
router.get('/:id', validateToken, controllers.getUserByIdController);

module.exports = router;
