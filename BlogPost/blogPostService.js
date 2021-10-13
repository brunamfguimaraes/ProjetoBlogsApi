const Sequelize = require('sequelize');
const RequestError = require('../helper/customErrors');
const { BlogPost, Category, PostCategory, User } = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(config);

const requiredValidation = (fields = {}) => {
  const fieldsKeys = Object.keys(fields);
  const invalidField = fieldsKeys.find((fieldKey) => fields[fieldKey] === undefined);
  if (invalidField) throw new RequestError('badRequest', `"${invalidField}" is required`);
};

const categoriesValidation = async (categoriesArr) => {
  const findOnePromises = categoriesArr.map((id) => Category.findOne({ where: { id } }));
  const promisesResults = await Promise.all(findOnePromises);
  const hasAnyoneNull = promisesResults.some((promisesResult) => !promisesResult);
  if (hasAnyoneNull) throw new RequestError('badRequest', '"categoryIds" not found');
};

const createBlogPost = async ({ title, content, userId }, transaction) => {
  const [published, updated] = [Date.now(), Date.now()];
  const blogPost = await BlogPost.create(
    { title, content, userId, published, updated }, { transaction },
  );
  return blogPost;
};

const createPostCategories = async ({ categoryIds, postId }, transaction) => {
  const createPostCategoriesRecords = categoryIds.map(
    (categoryId) => ({ postId, categoryId }),
  );
  await PostCategory.bulkCreate(createPostCategoriesRecords, { transaction });
};

const createBlogPostTransaction = ({ title, content, userId, categoryIds }) => 
  sequelize.transaction(async (t) => {
    await categoriesValidation(categoryIds);
    const newBlogPost = await createBlogPost({ title, content, userId }, t);
    const postId = newBlogPost.id;
    await createPostCategories({ categoryIds, postId }, t);
    return newBlogPost;
  });

const create = async ({ title, content, categoryIds, userId }) => {
  requiredValidation({ title, content, categoryIds });
  const { id } = await createBlogPostTransaction({ title, content, userId, categoryIds });
  return { id, userId, title, content };
};

module.exports = {
  create,
};
