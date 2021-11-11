const { Op } = require('sequelize');
const { Category, BlogPost, User } = require('../models');
const valid = require('../validations/BlogPost');

const getAllBlogPost = async () => {
  const posts = await BlogPost.findAll(
    { 
      include:
        [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    },
  );
  return posts;
};

const getBlogPostById = async (id) => {
  const post = await BlogPost.findByPk(
    id,
    {
      include:
        [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    },
  );

  valid.validatePostExistence(post);
  
  return post;
};

const getBlogPostBySearchTerm = async (term) => {
  const result = await BlogPost.findAll(
    { 
      where: { 
        [Op.or]: 
          [
            { title: { [Op.regexp]: term || ' ' } },
            { content: { [Op.regexp]: term || ' ' } },
          ],
      },
      include:
        [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    },
  );
  
  return result;
};

const addToPostsCategoriesTable = async (postId, categoryIds) => {
  const post = await BlogPost.findByPk(postId);
  categoryIds.forEach(async (categoryId) => {
    const categories = await Category.findByPk(categoryId);
    await post.addCategories(categories);
  });
};

const createBlogPost = async (post, categoryIds) => {
  await valid.validateCategoryIds(categoryIds, Category);
  const newPost = await BlogPost.create({ ...post });
  await addToPostsCategoriesTable(newPost.id, categoryIds);
  return newPost.dataValues;
};

const updateBlogPost = async (postId, { title, content }, userId) => {
  const post = await getBlogPostById(postId);
  valid.validatePostUserProperty(post.userId, userId);
  await BlogPost.update({ ...post, title, content }, { where: { id: postId } });
  const updatedPost = await getBlogPostById(postId);
  return updatedPost;
};

const removeBlogPost = async (postId, userId) => {
  const post = await getBlogPostById(postId);
  valid.validatePostExistence(post);
  valid.validatePostUserProperty(post.userId, userId);
  const removed = await BlogPost.destroy({ where: { id: postId } });
  return removed;
};

module.exports = {
  createBlogPost,
  updateBlogPost,
  removeBlogPost,
  getAllBlogPost,
  getBlogPostById,
  getBlogPostBySearchTerm,
};
