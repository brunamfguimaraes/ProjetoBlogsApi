const postService = require('../services/postService');

const createPost = async (req, res) => {
  const token = req.headers.authorization;
  const post = await postService(req.body, token);

  if (!post) { return res.status(400).json({ message: 'deu ruim' }); }
  return res.status(201).json(post);
};

module.exports = createPost;
