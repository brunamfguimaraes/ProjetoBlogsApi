const express = require('express');
const controllers = require('../controllers');
const { validatePasswordCreate, validateEmailCreate } = require('../middlewares');

const router = express.Router();

router.post('/', validateEmailCreate, validatePasswordCreate, controllers.postUserController);
router.get('/', controllers.getUsersController);

module.exports = router;
