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

module.exports = router;
