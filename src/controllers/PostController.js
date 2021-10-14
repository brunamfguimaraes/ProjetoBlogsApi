const rescue = require('express-rescue');
const PostService = require('../services/PostService');

const newPost = rescue(async (req, res, next) => {
  const postInfo = req.body;
  const { id } = req.userData;
  const post = await PostService.createPost(postInfo, id);

  if (post.error) return next(post.error);

  res.status(201).json(post);
});

const listPosts = rescue(async (req, res, next) => {
  const posts = await PostService.findPosts();

  if (posts.error) return next(posts.error);

  res.status(200).json(posts);
});

module.exports = {
  newPost,
  listPosts,
};