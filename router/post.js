const express = require('express');
const { controllerPostCreated, controllerPostList } = require('../controller/post');
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
           
router.get('/', tokenValidator, controllerPostList);

module.exports = router;