const { Categories } = require('../models');

const create = async ({ name }) => {
  try {
    return await Categories.create({ name });
  } catch (error) {
    return error;
  }
};

const findAll = async () => {
  try {
    return await Categories.findAll({});
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
  findAll,
};
