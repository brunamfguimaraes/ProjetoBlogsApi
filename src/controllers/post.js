const service = require('../services/post');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const result = await service.createPost(title, content, req.user.id, categoryIds);
  return res.status(201).json(result);
}

async function getPosts(_req, res) {
  const result = await service.getPosts();
  return res.status(200).json(result);
}

module.exports = {
  createPost,
  getPosts,
};
