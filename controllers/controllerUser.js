const service = require('../services/serviceUser');

const create = async (req, res) => {
  const response = await service.create(req.body);
  return res.status(200).json(response);
};

module.exports = {
  create,
};
