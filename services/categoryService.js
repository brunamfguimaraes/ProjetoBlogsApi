const { Categorie } = require('../models');

const createCategory = async (name) => {
  try {
    const newCategory = await Categorie.create({ name });
    return newCategory;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  createCategory,
};