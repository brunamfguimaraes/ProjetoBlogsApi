const express = require('express');

const router = express.Router();
const validateJWT = require('../middlewares/validateJWT');

const postController = require('../controllers/postController');

router.post('/',
postController.verifyTitle,
postController.verifyContent,
postController.verifyCategoryId,
validateJWT,
postController.createPost);

module.exports = router;