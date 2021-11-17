const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const verifyCategories = async (arrayOfCategoryIds) => {
  const allCategoriesExists = await Promise.all(
    arrayOfCategoryIds.map((e) => Category.findOne({ where: { id: e } })),
    );

  if (allCategoriesExists.includes(null)) return { message: '"categoryIds" not found' };
};

const addIntoPostCategories = async (postId, categories) => {
  const result = await Promise.all(categories.map(async (categoryId) => {
    const insertedCategorie = await sequelize.transaction(async (t) => {
      const newPostCategorie = await PostCategory.create({
        postId, categoryId }, 
        { transaction: t });
  
      return newPostCategorie;
    });

    return insertedCategorie;
  }));

  return result;
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
      const post = await BlogPost.create({
        title, content, userId }, { transaction: t });
      return post;
    });

    await addIntoPostCategories(newPost.dataValues.id, categoryIds);

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
