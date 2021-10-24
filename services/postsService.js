const { BlogPost } = require('../models/index');

const validate = async (title, content) => {
  if (!title) {
    return { status: 400, message: '"title" is required' };
  }
  if (!content) {
    return { status: 400, message: '"content" is required' };
  }
  return true;
};

const validateToken = async (token) => {
  if (!token) {
    return { status: 401, message: 'Token not found' };
  }
  if (token.length < 16) {
    return { status: 401, message: 'Expired or invalid token' };
  }
  return true;
};

const isValidCategory = async (ids) => {
  if (!ids) {
    return { status: 400, message: '"categoryIds" is required' };
  }
  const categories = await BlogPost.findAll({ where: { id: ids } });
  
  return categories;
};

const isValid = async (title, content, categoryIds, token) => {
  const valids = await validate(title, content);
  if (valids.message) {
    return valids;
  }
  const validToken = await validateToken(token);
  if (validToken.message) {
    return validToken;
  }
  const validCategory = await isValidCategory(categoryIds);
  if (validCategory.message) {
    return validCategory;
  }
  if (validCategory.length < 1) {
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

const getPosts = async (token) => {
  const validToken = await validateToken(token);
  if (validToken.message) {
    return validToken;
  }
  return true;
};

module.exports = {
  createPost,
  getPosts,  
};