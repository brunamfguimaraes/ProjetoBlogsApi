const { Category, BlogPost, User } = require('../models');
const valid = require('../validations/BlogPost');

const addToPostsCategoriesTable = async (postId, categoryIds) => {
  const post = await BlogPost.findByPk(postId);
  categoryIds.forEach(async (categoryId) => {
    const categories = await Category.findByPk(categoryId);
    await post.addCategories(categories);
  });
};

const create = async (post, categoryIds) => {
  await valid.checkCategoryIds(categoryIds, Category);
  const newPost = await BlogPost.create({ ...post });
  await addToPostsCategoriesTable(newPost.id, categoryIds);
  return newPost.dataValues;
};

const getAll = async () => {
  const posts = await BlogPost.findAll(
    { include:
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] },
  );
  return posts;
};

module.exports = {
  create,
  getAll,
};
