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

router.get('/:id',
    validateJWT,
    postController.getOne);

router.put('/:id',
    validateJWT,
    postController.updatePost);

router.delete('/:id',
    validateJWT, 
    postController.removePost);

module.exports = router;
