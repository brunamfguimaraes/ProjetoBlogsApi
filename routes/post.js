const Router = require('express');
const { validateToken } = require('../middleware/validateToken');
const postController = require('../controllers/postController');

const router = Router();

router.post('/post', validateToken, postController.create);
// router.get('/categories', validateToken, categoriesControle.getAll);

module.exports = router;