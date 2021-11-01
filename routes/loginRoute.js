const express = require('express');

const loginController = require('../controllers/loginController');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router.post('/', loginController.login);

router.use(errorMiddleware);

module.exports = router;