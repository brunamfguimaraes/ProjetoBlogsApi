const router = require('express').Router();
const { userLogin } = require('../controllers/loginController');

router.post('/', userLogin);

module.exports = router;