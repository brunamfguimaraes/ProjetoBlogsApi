const Joi = require('joi');

const validateAuth = require('../../../../middlewares/validateAuth');
const { getOnlyId, editPost } = require('../../repositories/postRepository');

const errorMessage = (code, message) => ({
  code,
  message,
});

const validatePost = (data) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).optional(),
  }).validate(data);

  if (error) {
    const { message } = error.details[0]
    throw errorMessage('BAD_REQUEST', message);
  }
}

const validateUserActions = async(id, dataId) => {
  const blogPost = await getOnlyId(id)

  if(blogPost.dataValues.uderId !== dataId) {
    throw errorMessage('UNAUTHORIZED', 'Unauthorized user')
  }
}

const categoriesIdExists = (categoriesId) => {
  if(categoriesId) {
    throw errorMessage('BAD_REQUEST', 'Categories cannot be edited');
  }
}

const editPostUseCase = async (auth, id, data) => {
  const payload = await validateAuth(auth);

  validatePost(data);
  categoriesIdExists(data.categoryIds);
  await validateUserActions(id, payload.id);

  await editPost(data, id);

  const postAlreadyEdited = editedPost(id);

  return postAlreadyEdited
}

module.exports = editPostUseCase;