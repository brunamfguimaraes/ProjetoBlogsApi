const { Category } = require('../models/index');

// recebi ajuda do Jonathan Souza e Renato Graça para arrumar o GitHub e Req05
const serviceCategoryCreate = async (category) => {
  const categoryInserted = await Category.create(category);
  return { code: 201, categoryInserted };
};

const serviceCategoryList = async () => {
  const userList = await Category.findAll();
    return {
      allCategory: { message: userList }, code: 200,
     };
};

module.exports = {
  serviceCategoryCreate,
  serviceCategoryList,
};