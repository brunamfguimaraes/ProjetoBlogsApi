const { BlogPost } = require('../models');
const categoriesService = require('./categoriesService');

const genericError = {
  err: {
    status: 500,
    message: {
      message: 'Undefined error',
    },
} };

const categoryNotFindError = {
  err: {
    status: 400,
    message: {
      message: '"categoryIds" not found',
    },
} };

const validateIds = async (idArray) => {
  let allIsValid = true;
  const val = await Promise.allSettled(idArray.map((id) => categoriesService.getCategoryById(id)));

  val.forEach(({ value }) => { if (value === false) allIsValid = false; });

  return allIsValid;
};

const createPost = async (postInfo, userInfo) => {
  const { title, content, categoryIds } = postInfo;
  const userId = userInfo.id;
  const idsValidation = await validateIds(categoryIds);

  if (idsValidation === false) return categoryNotFindError;
  try {
    const { id } = await BlogPost.create({ userId, title, content });
    return { resp: {
        status: 201,
        content: {
          id,
          userId,
          title,
          content,
        },
      },
    };
  } catch (e) { return genericError; } 
};

module.exports = {
  createPost,
};