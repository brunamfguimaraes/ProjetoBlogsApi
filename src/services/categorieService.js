const { Category } = require('../models/index');
const { code } = require('../schema/index');

/**
 * 
 * @param {object} categorie name
 * @returns code, notification
 */
const createCatagorie = async (categorie) => {
  const newCategorie = await Category.create(categorie);

  const registeredSuccessfully = {
    code: code.HTTP_CREATED,
    notification: newCategorie,
  };

  return registeredSuccessfully;
};

const getCategories = async () => {
  const findAllCategories = await Category.findAll();

  const searchResults = {
    code: code.HTTP_OK_STATUS,
    notification: findAllCategories,
  };

  return searchResults;
};

module.exports = {
  createCatagorie,
  getCategories,
};
