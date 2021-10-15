const Router = require('express');

const router = Router();
const userControle = require('../controllers/userController');

router.post('/user', userControle.create);

module.exports = router;