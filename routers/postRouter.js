const express = require('express');

const router = express.Router();
const validateJWT = require('../middlewares/validateJWT');

const postController = require('../controllers/postController');

router.post('/',
validateJWT,
postController.verifyTitle,
postController.verifyContent,
postController.verifyCategoryId,
postController.createPost);

router.get('/',
validateJWT,
postController.getAll);

router.get('/:id',
validateJWT,
postController.getOne);

module.exports = router;