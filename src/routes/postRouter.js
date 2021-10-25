const router = require('express').Router();

const PostController = require('../controllers/postController');
// const nameValidator = require('../middlewares/categoryValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post('/', tokenValidator, PostController.create);

module.exports = router;
