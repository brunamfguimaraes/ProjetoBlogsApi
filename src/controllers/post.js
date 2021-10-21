const service = require('../services/post');

async function createPost(req, res) {
  console.log(req.user);
  const { title, content } = req.body;
  const result = await service.createPost(title, content);
  return res.status(201).json(result);
}

module.exports = {
  createPost,
};
