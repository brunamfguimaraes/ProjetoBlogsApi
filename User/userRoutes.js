const express = require('express');
const controller = require('./userController');

const router = express.Router();

router.route('/').post(controller.create);

module.exports = router;
