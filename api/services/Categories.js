const { Category } = require('../../models/index');

const BAD_REQUEST = 'bad_request';

const addNewCategory = async (name) => {
  if (!name) {
    return { codeErr: BAD_REQUEST, errMsg: '"name" is required' };
  }

  try {
    const category = await Category.create({ name });

    return category;
  } catch (error) {
    return { errMsg: error.message };
  }
};

const getAllCategories = async () => {
  try {
    // o order abaixo é uma solução paliativa, pois não consegui descobrir o motivo pelo qual não está retornando as categorias conforme esperado
    const allCategories = await Category.findAll({ order: [['id', 'ASC']] });

    return allCategories;
  } catch (error) {
    return { errMsg: error.message };
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
};
