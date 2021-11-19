const Joi = require('joi');
const { listById } = require('../../../category/repositories/CategoryRepository');
const { createPost, createPostCategory } = require('../../repositories/postRepository');

const validateAuth = require('../../../../middlewares/validateAuth');

const errorMessage = (code, message) => ({
  code,
  message,
});

const validatePost = (data) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).validate(data);

  if (error) {
    const { message } = error.details[0];

    throw errorMessage('BAD_REQUEST', message);
  }
};

const create = async (auth, data) => {
  const payload = await validateAuth(auth);

  validatePost(data);

  const categories = await listById(data);

  if (categories.length !== data.categoryIds.length) {
    throw errorMessage('BAD_REQUEST', '"categoryIds" not found');
  }

  const { title, content } = data;
  const { id } = payload;

  console.log('DATA IDS', data.categoryIds);

  const groupContent = { title, content, id };

  console.log('CONSOLE GROUP', groupContent);

  const post = await createPost(groupContent);
  const { published, updated, ...postDB } = post.dataValues;
  const { id: postId } = post.dataValues;

  data.categoryIds.forEach(async (categoryId) => {
    await createPostCategory({ postId, categoryId });
  });

  return postDB;
};

module.exports = create;