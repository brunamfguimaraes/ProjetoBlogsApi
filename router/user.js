const rescue = require('express-rescue');
const express = require('express');
const controllers = require('../controllers/user');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.get('/', checkToken, rescue(controllers.getUser));
router.get('/:id', checkToken, rescue(controllers.getUserById));
router.post('/', rescue(controllers.createUser));

module.exports = router;