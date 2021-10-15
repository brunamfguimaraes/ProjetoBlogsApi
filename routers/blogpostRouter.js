const express = require('express');
const blogpostController = require('../controller/blogpostController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/post', jwtValidation, blogpostController.createBlogpost);

module.exports = router;