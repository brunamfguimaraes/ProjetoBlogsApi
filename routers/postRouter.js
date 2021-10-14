const express = require('express');

const router = express.Router();
// const validateJWT = require('../middlewares/validateJWT');

const postController = require('../controllers/postController');

router.post('/',
postController.createPost);

module.exports = router;