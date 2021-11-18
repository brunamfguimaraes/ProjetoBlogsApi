const rescue = require('express-rescue');
const {
  getPostService,
  createPostService,
  getAllPostsService,
  updatePostService,
  deletePostService,
  createByQueryService,
} = require('../service/postService');

const createPost = rescue(async (req, res) => {
  const { id: userId } = req.user;
  const body = { ...req.body, userId };
  const posts = await createPostService(body);
  return res
    .status(201)
    .json({ id: posts.id, userId, title: posts.title, content: posts.content });
});

const getAllPosts = rescue(async (req, res) => {
  const posts = await getAllPostsService();
  return res.status(200).json(posts);
});

const getPost = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await getPostService(id);
  return res.status(200).json(post);
});

const updatePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const posts = await updatePostService(req.body, id, user);
  return res.status(200).json(posts);
});

const deletePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  await deletePostService(id, user);
  res.status(204).end();
});

const createPostByQuery = rescue(async (req, res) => {
  const { q } = req.query;
  const posts = await createByQueryService(q);
  return res.status(200).json(posts);
});

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  createPostByQuery,
};
