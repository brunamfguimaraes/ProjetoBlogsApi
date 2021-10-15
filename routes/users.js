const Router = require('express');

const router = Router();
const userControle = require('../controllers/userController');
const { validateToken } = require('../middleware/validateToken');

router.post('/user', userControle.create);
router.get('/user', validateToken, userControle.getAll);
module.exports = router;