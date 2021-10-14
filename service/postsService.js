const Joi = require('joi');
const jwt = require('../auth/jwt');

const categoriesService = require('./categoriesService');

const { BlogPost, PostsCategorie, User, Categorie } = require('../models');

const validForms = (body) => {
  const { title, content, categoryIds } = body;
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).validate({ title, content, categoryIds });
  return error;
};

const validFormEditPost = (body) => {
  const { title, content } = body;
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate({ title, content });
  return error;
};

const findCat = async (categoryIds) => {
  const result = await categoriesService.findCategories(categoryIds);
  if (categoryIds.length !== result) {
    return { isValidCat: true, message: { message: '"categoryIds" not found' },
    }; 
}
  return { isValidCat: false };
};

const getById = async (id) => BlogPost.findOne({ 
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categorie, as: 'categories', through: { attributes: [] } },
  ],
 });

const createPost = async (token, body) => {
  const { title, content, categoryIds } = body;

  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.validToken) return isValidToken;
  
  const validForm = validForms(body);
  if (validForm) return validForm;

  const isValidCat = await findCat(categoryIds);
  if (isValidCat.isValidCat) return isValidCat;
  
  const { result: { userId } } = isValidToken;
  const { id } = await BlogPost.create({ userId, title, content });

  const postId = id;

  const promisses = categoryIds.map((categoryId) => PostsCategorie.create({
    categoryId, postId,
  }));
  Promise.resolve(promisses);

  return { id, userId, title, content };
};

const getAllPost = async (token) => {
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.validToken) return isValidToken;

  const getAll = await BlogPost.findAll({ include: [{ all: true }] });

  return getAll;  
};

const getPostById = async (token, id) => {
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.validToken) return isValidToken;

  const getPostId = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
   });

  return getPostId;  
};

const editPosts = async (token, id, body) => {
  const { title, content, categoryIds } = body;
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.validToken) return { status: 401, message: isValidToken.message.message };

  const validForm = validFormEditPost(body);
  if (validForm) return { status: 400, message: validForm.details[0].message };

  const { userId } = await getById(id);

  if (isValidToken.result.userId !== userId) {
    return { status: 401, message: 'Unauthorized user' };
  }

  if (categoryIds) return { status: 400, message: 'Categories cannot be edited' };

  await BlogPost.update({ title, content }, {
    where: {
      id,
    },
  });

  return getById(id);
};

module.exports = {
  editPosts,
  createPost,
  getAllPost,
  getPostById,
};
