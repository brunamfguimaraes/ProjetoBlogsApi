const { registerPost, getAllPosts } = require('../services/postService');
const middlewares = require('../middlewares');

const createPost = async (req, res, next) => {
  const token = req.headers.authorization;
  const { error } = middlewares.validationPost(req.body);
  if (error) return next(error);

  const newPost = await registerPost(req.body, token);
  if (newPost.message) return res.status(newPost.statusCode).json({ message: newPost.message });

  return res.status(201).json(newPost);
};

const getPosts = async (_req, res) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createPost,
  getPosts,
};