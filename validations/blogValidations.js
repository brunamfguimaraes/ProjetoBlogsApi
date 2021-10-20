const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const privateKey = process.env.JWT_SECRET;

const MISSING_TITLE = {
  status: 400,
  error: {
    message: '"title" is required',
  },
};

const MISSING_CONTENT = {
  status: 400,
  error: {
    message: '"content" is required',
  },
};

const MISSING_CATEGORYIDS = {
  status: 400,
  error: {
    message: '"categoryIds" is required',
  },
};

const CATEGORY_NOT_FOUND = {
  status: 400,
  error: {
    message: '"categoryIds" not found',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'Expired or invalid token',
  },
};

const MISSING_AUTH = {
  status: 401,
  error: {
    message: 'Token not found',
  },
};

const validTitle = (title) => {
  if (!title) {
    throw MISSING_TITLE;
  }
};

const validContent = (content) => {
  if (!content) {
    throw MISSING_CONTENT;
  }
};

const validCategoryId = async (categoryIds) => {
  if (!categoryIds) {
    throw MISSING_CATEGORYIDS;
  }
  const result = await Category.findAll();
  const categoryConten = result.map((category) => {
    const { dataValues } = category;
    return dataValues.id;
  });
  const includCategories = categoryIds.every((Id) => categoryConten.includes(Id));
  if (!includCategories) {
    throw CATEGORY_NOT_FOUND;
  }
};

const validToken = (token) => {
  if (!token) {
    throw MISSING_AUTH;
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    throw INVALID_TOKEN;
  }
};

module.exports = {
  validTitle,
  validContent,
  validCategoryId,
  validToken,
};