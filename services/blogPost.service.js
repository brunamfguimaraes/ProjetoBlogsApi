const Sequelize = require('sequelize');
const { BlogPost, PostsCategory } = require('../models');
const PostValidation = require('../schemas/blogPost.validation');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const createPost = async ({ title, content, categoryIds, userId }) => {
  PostValidation.verifyBlogPostInformations(title, content, categoryIds);
  await PostValidation.verifyCategoryIdExists(categoryIds);
  const t = await sequelize.transaction();
  try {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaa${newPost}`);
    await Promise.all(categoryIds.map((id) =>
      PostsCategory.create({ postId: newPost.id, categoryId: id }, { transaction: t })));
    await t.commit();
    return newPost;
  } catch (error) {
    await t.rollback();
    console.log(error.message);
    return error;
  }
};

const getAllBlogPost = async () => {
  try {
    const allBlogPosts = await BlogPost.findAll({});
    return allBlogPosts;
  } catch (error) {
    return error;
  }
};

module.exports = { createPost, getAllBlogPost };
