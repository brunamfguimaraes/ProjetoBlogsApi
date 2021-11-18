const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

router.post('/',
    postController.checkTitle,
    postController.checkContent,
    postController.checkCategoryById,
    validateJWT,
    postController.createPost);

router.get('/',
    validateJWT,
    postController.getAll);

module.exports = router;
