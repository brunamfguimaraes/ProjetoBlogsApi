const service = require('../services/categoriesService');

const createCategorie = async (req, res) => service.createCategorie(req.body)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { createCategorie };
