const { BlogPost } = require('../models/index');

const validate = (title, content) => {
  if (!title) {
    return { status: 400, message: '"title" is required' };
  }
  if (!content) {
    return { status: 400, message: '"content" is required' };
  }
  return true;
};

const validateToken = (token) => {
  if (!token) {
    return { status: 401, message: 'Token not found' };
  }
  if (token.length < 16) {
    return { status: 401, message: 'Expired or invalid token' };
  }
  return true;
};

const isValidCategory = async (ids) => {
  let categories;
  let exist = 0;
  if (!ids) {
    return { status: 400, message: '"categoryIds" is required' };
  }
  ids.forEach(async (id) => {
    categories = await BlogPost.findAll({ where: { id } });
    if (categories.length > 0) {
      exist += 1;
    }
  });
  return exist;
};

const isValid = async (title, content, categoryIds, token) => {
  const valids = validate(title, content);
  if (valids.message) {
    return valids;
  }
  const validToken = validateToken(token);
  if (validToken.message) {
    return validToken;
  }
  const validCategory = await isValidCategory(categoryIds);
  console.log(validCategory, 'VALID-CATEGORY');
  if (validCategory.message) {
    return validCategory;
  }
  if (validCategory !== 2) {
    return { status: 400, message: '"categoryIds" not found' };
  }
  return true;
};

const createPost = async ({ title, content, categoryIds }, token) => {
  const validateAll = await isValid(title, content, categoryIds, token);
  if (validateAll.message) {
    return validateAll;
  }
  return true;
};

module.exports = {
  createPost,
};