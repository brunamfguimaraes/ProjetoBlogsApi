const service = require('../services/post');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const result = await service.createPost(title, content, req.user.id, categoryIds);
  return res.status(201).json(result);
}

module.exports = {
  createPost,
};
