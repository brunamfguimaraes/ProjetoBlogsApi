const service = require('../services/Categorie');

const create = async (req, res) => {
  const result = await service.create(req.body);
  return res.status(201).json(result);
};

module.exports = {
  create,
};
