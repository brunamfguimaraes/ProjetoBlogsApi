const router = require('express').Router();

const PostController = require('../controllers/postController');
const postValidator = require('../middlewares/postValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post('/', postValidator, tokenValidator, PostController.create);

module.exports = router;
