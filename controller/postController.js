const postsService = require('../service/postsService');

const createPost = async (req, res) => {
  const { body } = req;
  const token = req.headers.authorization;

  const post = await postsService.createPost(token, body);

  if (post.validToken) {
    return res.status(401).json(post.message);
  }

  if (post.isValidCat) {
    return res.status(400).json(post.message);
  }

  if (post.details) {
    return res.status(400).json({ message: post.details[0].message });
  }

  if (post.categorieExist) {
    return res.status(409).json(post.error);
  }

  return res.status(201).json(post);
};

const getAllCategories = async (req, res) => {
  const token = req.headers.authorization;

  const getAll = await createPost.getAllCategories(token);

  if (getAll.validToken) {
    return res.status(401).json(getAll.message);
  }

  return res.status(200).json(getAll);
};

module.exports = {
  createPost,
  getAllCategories,
};