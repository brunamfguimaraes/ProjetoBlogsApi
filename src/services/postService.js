const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category } = require('../sequelize/models');
const Error = require('../helpers/errors');

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
  console.log('CATEGORY ARRAY:', categoryIds);
  const categoriesCreated = categoryIds.map(
    (categoryId) => ({ postId, categoryId }),
  );
  console.log('CATEGORIESCREATED:', categoriesCreated);
  await PostCategory.bulkCreate(categoriesCreated, { transaction: t });
};

const createPostTransaction = async ({ title, content, userId, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await createPost({ title, content, userId }, t);
    const postId = newPost.id;
    console.log('SERVICE POSTID:', postId);
    await createCategoriesPost({ categoryIds, postId }, t);
    // console.log('RESULT:', newPost.dataValues);
    return newPost;
  });
  return result;
};

module.exports = {
  createPostTransaction,
};
