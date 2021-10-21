const { Category, BlogPost, User } = require('../models');
const valid = require('../validations/BlogPost');

const getAll = async () => {
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

const getById = async (id) => {
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

  valid.checkIfPostExists(post);
  
  return post;
};

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

const update = async (postId, { title, content }, userId) => {
  const post = await getById(postId);
  valid.checkPostUserProperty(post.userId, userId);
  await BlogPost.update({ ...BlogPost, title, content }, { where: { id: postId } });
  const updatedPost = await getById(postId);
  return updatedPost;
};

module.exports = {
  create,
  update,
  getAll,
  getById,
};
