const { Categorie } = require('../models');

const erroMessage = {
  code: 400,
  message: '"name" is required',
};

const create = async (name) => {
  if (!name) { return erroMessage; }
  const { id } = await Categorie.create({ ...name });
  return id;
};

module.exports = {
  create,
};