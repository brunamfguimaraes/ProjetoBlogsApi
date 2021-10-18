const express = require('express');
const { controllerPostCreated } = require('../controller/post');
const { 
  tokenValidator,
  titleValidator,
  contentValidator,
  categoryIdValidator } = require('../middlewares');

const router = express.Router();

router.post('/',
            tokenValidator,
            titleValidator,
            contentValidator,
            categoryIdValidator,
            controllerPostCreated);

module.exports = router;