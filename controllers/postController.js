const postService = require('../services/postService');

const create = async (req, res) => {
  const token = req.headers.authorization;
  const result = await postService.create(req.body, token);
  if (result.code) { return res.status(result.code).json({ message: result.message }); }
  return res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await postService.getAll();
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
}; 