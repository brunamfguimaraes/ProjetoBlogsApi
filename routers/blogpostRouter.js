const express = require('express');
const blogpostController = require('../controller/blogpostController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/post', jwtValidation, blogpostController.getAllPosts);
router.post('/post', jwtValidation, blogpostController.createBlogpost);

module.exports = router;