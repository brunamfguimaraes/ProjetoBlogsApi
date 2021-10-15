const { Category } = require('../models');

const checkCategoryId = async (categoryIds) => {  
  const idCheck = await Promise.all(categoryIds.map((catId) => Category.findByPk(catId)));
 
  if (idCheck.some((idCategory) => idCategory === null)) {
    return { fieldError: true, message: '"categoryIds" not found' };
  }  

  return { fieldError: false };
};

module.exports = {
  checkCategoryId,
};
