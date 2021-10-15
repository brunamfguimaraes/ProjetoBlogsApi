const PostService = require('../services/postService');
const codes = require('../util/httpCodes');

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const post = await PostService.createPost(title, content, categoryIds, userId);

    return res.status(codes.created).json(post);
  } catch (err) {
    return next(err);
  }
};

const getPosts = async (_req, res, next) => {
  try {
    const posts = await PostService.getAllPosts();

    return res.status(codes.ok).json(posts);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getPostsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await PostService.getPostsById(id);

    return res.status(codes.ok).json(post);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const updateData = req.body;
  try {
    const post = await PostService.updatePost(postId, userId, updateData);

    return res.status(codes.ok).json(post);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
};