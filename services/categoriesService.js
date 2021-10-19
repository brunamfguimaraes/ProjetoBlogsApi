const { Category } = require('../models');

const genericError = {
  err: {
    status: 500,
    message: {
      message: 'Undefined error',
    },
} };

// const categoryNotFindError = {
//   err: {
//     status: 400,
//     message: {
//       message: '"categoryIds" not found',
//     },
// } };

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
    return genericError; 
} 
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  try {
    return {
      resp: {
        status: 200,
        content: categories,
      },
    };
  } catch (e) { return genericError; }
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id } });
  if (category === null) return false;
  return true;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};