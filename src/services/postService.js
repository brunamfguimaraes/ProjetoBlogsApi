const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../sequelize/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../sequelize/config/config')[env];

const sequelize = new Sequelize(config);

const createPost = async ({ title, content, userId }, t) => {
  const [published, updated] = [Date.now(), Date.now()];
  const newPost = await BlogPost.create(
    { title, content, userId, published, updated },
    { transaction: t },
  );

  return newPost;
};

const createCategoriesPost = async ({ categoryIds, postId }, t) => {
  const categoriesCreated = categoryIds.map(
    (categoryId) => ({ postId, categoryId }),
  );
  await PostCategory.bulkCreate(categoriesCreated, { transaction: t });
};

const createPostTransaction = async ({ title, content, userId, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await createPost({ title, content, userId }, t);
    const postId = newPost.id;
    await createCategoriesPost({ categoryIds, postId }, t);
    return newPost;
  });
  return result;
};

// I get helped by Lucas Martins to build this query
const getAll = async () => {
  const allPosts = await BlogPost.findAll(
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

  return allPosts;
};

module.exports = {
  createPostTransaction,
  getAll,
};
