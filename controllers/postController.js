const express = require('express');
const validPost = require('../middlewares/postMiddleware');
const { validToken } = require('../middlewares/tokenMiddleware');
const { PostsCategories, User, BlogPosts } = require('../models');

const router = express.Router();

const createPostCategories = (postId, categories) => {
  categories.forEach(async (element) => {
    console.log(postId);
    console.log(element);
    await PostsCategories.create({ postId, categoryId: element });
  });
};
router.post('/', validToken, validPost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.params;
  try {
    const getUser = await User.findOne({ where: { email } });
    const createPost = await BlogPosts.create(
      { title, content, categoryIds: JSON.stringify(categoryIds), userId: getUser.dataValues.id },
    );
    await createPostCategories(createPost.id, categoryIds);
    return res.status(201).json(createPost);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
