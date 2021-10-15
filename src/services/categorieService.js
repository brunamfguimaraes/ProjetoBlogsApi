const { Categorie } = require('../models/index');
const { code } = require('../schema/index');

const createCatagorie = async (categorie) => {
  const newCategorie = await Categorie.create(categorie);

  const registeredSuccessfully = {
    code: code.HTTP_CREATED,
    notification: newCategorie,
  };

  return registeredSuccessfully;
};

module.exports = {
  createCatagorie,
};
