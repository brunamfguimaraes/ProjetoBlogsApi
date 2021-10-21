const service = require('../services/post');

async function createPost(req, res) {
  const { title, content } = req.body;
  const result = await service.createPost(title, content, req.user.id);
  return res.status(201).json(result);
}

module.exports = {
  createPost,
};
