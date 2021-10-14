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
const httpStatus = require('../httpStatus');

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
    res.status(httpStatus.created).json({
      id,
      userId,
      title,
      content,
    });
  });

route.get('/',
  verifyToken,
  async (req, res) => {
    const allPosts = await postService.getAllPosts();
    res.status(httpStatus.ok).json(allPosts);
});

module.exports = route;
