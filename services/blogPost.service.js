const Sequelize = require('sequelize');
const { BlogPost, PostsCategory, User, Category } = require('../models');
const BlogPostValidation = require('../schemas/blogPost.validation');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const createPost = async ({ title, content, categoryIds, userId }) => {
  BlogPostValidation.verifyBlogPostInformations(title, content, categoryIds);
  await BlogPostValidation.verifyCategoryIdExists(categoryIds);
  const t = await sequelize.transaction();
  try {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
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
    const allBlogPosts = await BlogPost.findAll({
      include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return allBlogPosts;
  } catch (error) {
    return error;
  }
};

const getBlogPostById = async (id) => {
  try {
    const blogPost = await BlogPost.findByPk(id, {
      include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return blogPost;
  } catch (error) {
    return error;
  }
};
const updateBlogPost = async (id, userId, body) => {
  await BlogPostValidation.verifyPostBlogCreator(id, userId);
  BlogPostValidation.verifyUpdateFields(body);
  try {
    const { title, content } = body;
    await BlogPost.update({ title, content }, { where: { id } });
    const blogPost = await BlogPost.findByPk(id, {
      include: [
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    console.log(blogPost);
    return blogPost;
  } catch (error) {
    return error;
  }
};

module.exports = { createPost, getAllBlogPost, getBlogPostById, updateBlogPost };
