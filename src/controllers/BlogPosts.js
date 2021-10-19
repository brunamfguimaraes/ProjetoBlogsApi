const service = require('../services/BlogPost');

const create = async (req, res) => {
  const { id: userId } = req.user;
  const { categoryIds, ...post } = req.body;
  const newPost = await service.create({ ...post, userId }, categoryIds);
  return res.status(201).json(newPost);
};

module.exports = {
  create,
};
