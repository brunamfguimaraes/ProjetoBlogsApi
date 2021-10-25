const router = require('express').Router();

const PostController = require('../controllers/postController');
const { postValidator, existsCategories } = require('../middlewares/postValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post('/', postValidator, existsCategories, tokenValidator, PostController.create);
router.get('/', tokenValidator, PostController.getAll);

module.exports = router;
