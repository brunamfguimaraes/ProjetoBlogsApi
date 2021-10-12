const express = require('express');

const { create } = require('../../controllers/postController');

const validateToken = require('../../middlewares/validateToken');

 const { 
   validateTitle,
   validateContent,
   validateContegoryIds,
  } = require('../../middlewares/postMiddleware');

const router = express.Router();

router.post('/', 
  validateToken,
  validateTitle,
  validateContent,
  validateContegoryIds,
  create);

module.exports = router;