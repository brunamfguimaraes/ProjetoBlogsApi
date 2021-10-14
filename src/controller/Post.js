const express = require('express');
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const {
  verifyToken,
} = require('../middlewares/User');
const {
  verifyPostTitle,
  verifyPostContent,
  verifyPostCategoryIds,
} = require('../middlewares/Post');

const postService = require('../service/Post');

route.post('/',
  verifyToken,
  verifyPostTitle,
  verifyPostContent,
  verifyPostCategoryIds,
  async (req, res) => {
    const { data: { email } } = req.logged;
    const { title, content, categoryIds } = req.body;
    const userId = await postService.findUserByEmail(email);
    const id = await postService.createPost(title, content, categoryIds, userId);
    res.status(201).json({
      id,
      userId,
      title,
      content,
    });
  });

module.exports = route;
