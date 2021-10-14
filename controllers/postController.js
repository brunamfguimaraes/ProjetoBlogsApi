const { registerPost } = require('../services/postService');
const middlewares = require('../middlewares');

const createPost = async (req, res, next) => {
  const token = req.headers.authorization;
  const { error } = middlewares.validationPost(req.body);
  if (error) return next(error);

  const newPost = await registerPost(req.body, token);
  if (newPost.message) return res.status(newPost.statusCode).json({ message: newPost.message });

  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};