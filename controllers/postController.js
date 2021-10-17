const postService = require('../services/postService');

const create = async (req, res) => {
  const token = req.headers.authorization;
  const result = await postService.create(req.body, token);
  if (result.code) { return res.status(result.code).json({ message: result.message }); }
  return res.status(201).json(result);
};

module.exports = {
  create,
}; 