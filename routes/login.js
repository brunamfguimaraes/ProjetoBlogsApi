const Router = require('express');

const router = Router();
const loginControle = require('../controllers/loginController');

router.post('/login', loginControle.login);

module.exports = router;