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

const findPost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const post = await PostService.findPost(id);

  if (post.error) return next(post.error);

  res.status(200).json(post);
});

const updatePost = rescue(async (req, res, next) => {
  const userId = req.userData.id;
  const postId = req.params.id;
  const bodyInfo = req.body;
  const post = await PostService.editPost(parseInt(postId, 10), bodyInfo, userId);

  if (post.error) return next(post.error);

  res.status(200).json(post);
});

module.exports = {
  newPost,
  listPosts,
  findPost,
  updatePost,
};
