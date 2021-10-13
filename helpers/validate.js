// const express = require('express');

const validateDisplayName = (displayName) => {
  const MIN_LENGTH = 8;
  if (!displayName || displayName.length < MIN_LENGTH) {
    return '"displayName" length must be at least 8 characters long';
  }
};

const validateEmail = (email) => {
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) return '"email" must be a valid email';
};

const validatePassword = (password) => {
  const MIN_LENGTH = 6;
  if (password === '') return '"password" is not allowed to be empty';
  if (!password) return '"password" is required';
  if (password.length < MIN_LENGTH || password.length > MIN_LENGTH) {
    return '"password" length must be 6 characters long';
  }
};

const validateName = (name) => {
  if (!name) return '"name" is required';
};

const validateTitle = (title) => {
  if (!title) return '"title" is required';
};

const validateContent = (content) => {
  if (!content) return '"content" is required';
};

const validateCategoryIds = (categoryIds) => {
  if (!categoryIds) return '"categoryIds" is required';
};

const validateCategoryIdsUpdate = (categoryIds) => {
  if (categoryIds) return 'Categories cannot be edited';
};

const validateUser = ({ displayName, email, password }) => {
  const invalidDisplayName = validateDisplayName(displayName);
  if (invalidDisplayName) return invalidDisplayName;

  const invalidEmail = validateEmail(email);
  if (invalidEmail) return invalidEmail;

  return validatePassword(password);
};

const validateLogin = ({ email, password }) => {
  const invalidEmail = validateEmail(email);
  if (invalidEmail) return invalidEmail;
  
  return validatePassword(password);
};

const validatePost = ({ title, content, categoryIds }) => {
  const invalidTitle = validateTitle(title);
  if (invalidTitle) return invalidTitle;
  const invalidContent = validateContent(content);
  if (invalidContent) return invalidContent;
  
  return validateCategoryIds(categoryIds);
};

const validatePostUpdate = ({ title, content, categoryIds }) => {
  const invalidTitle = validateTitle(title);
  if (invalidTitle) return invalidTitle;
  const invalidContent = validateContent(content);
  if (invalidContent) return invalidContent;
  
  return validateCategoryIdsUpdate(categoryIds);
};

const validateCategory = ({ name }) => validateName(name);

module.exports = {
  validateUser,
  validateLogin,
  validateCategory,
  validatePost,
  validatePostUpdate,
};
