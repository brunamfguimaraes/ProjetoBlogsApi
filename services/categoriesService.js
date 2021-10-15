const { Category } = require('../models');

const genericError = {
  err: {
    status: 500,
    message: {
      message: 'Undefined error',
    },
} };

const createCategory = async (categoryInfo) => {
  const { name } = categoryInfo;
  console.log(name);
  try {
    const { id } = await Category.create(categoryInfo);
    return {
      resp: {
        status: 201,
        content: {
          id,
          name,
        },
      },
    };
  } catch (e) {
 console.log(e);
    return genericError; 
}
};

module.exports = {
  createCategory,
};