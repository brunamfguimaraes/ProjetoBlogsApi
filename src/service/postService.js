const Sequelize = require('sequelize');
const { BlogPost, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const verifyCategories = async (arrayOfCategoryIds) => {
  const allCategoriesExists = await Promise.all(
    arrayOfCategoryIds.map((e) => Category.findOne({ where: { id: e } })),
    );

  if (allCategoriesExists.includes(null)) return { message: '"categoryIds" not found' };
};

const createNewPost = async (userId, title, content, categoryIds) => {
  try {
    const inexistentCategory = await verifyCategories(categoryIds);
    
    if (inexistentCategory && inexistentCategory.message) {
      return { 
        message: inexistentCategory.message, status: 400, 
      }; 
    }

    const newPost = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ title, content, userId }, 
        { transaction: t });

      return post;
    });

    return newPost;
  } catch (e) {
    console.log(e.message);
  }
};

const lookForNullPostParams = (title, content, categoryIds) => {
  if (!title) {
    return { message: '"title" is required' };
  }

  if (!content) {
    return { message: '"content" is required' };
  }

  if (!categoryIds) {
    return { message: '"categoryIds" is required' };
  }
};

module.exports = {
  createNewPost,
  lookForNullPostParams,
};
