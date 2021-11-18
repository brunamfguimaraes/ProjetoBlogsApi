const service = require('../services/categoriesService');

const createCategorie = async (req, res) => service.createCategorie(req.body)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = async (_req, res) => service.getAll()
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { createCategorie, getAll };
