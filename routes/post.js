const Router = require('express');
const { validateToken } = require('../middleware/validateToken');
const postController = require('../controllers/postController');

const router = Router();

router.post('/post', validateToken, postController.create);
router.get('/post', validateToken, postController.getAll);

module.exports = router;