const express = require('express');
const { createPost } = require('../controllers/BlogPost');

const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken, createPost);


module.exports = router;