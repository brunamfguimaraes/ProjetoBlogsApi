const { User: UserModel } = require('../models');
const { Category: CategoryModel } = require('../models');
const AppError = require('./appError');
const codes = require('./httpCodes');
const messages = require('./errorMessages');

const rightEmailFormat = (email) => {
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);
  return isValid;
};

const validateDisplayName = (displayName, min) => {
  if (displayName.length < min) {
    throw new AppError(codes.badRequest, messages.shortDisplayName);
  }
};

const emailConflict = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  return user;
};

const validateEmail = (email) => {
  if (email === '') throw new AppError(codes.badRequest, messages.emptyEmail);
  if (!email) throw new AppError(codes.badRequest, messages.missingEmail);
  if (!rightEmailFormat(email)) {
    throw new AppError(codes.badRequest, messages.wrongEmailFormat);
  }
};

const validatePassword = (password, min) => {
  if (password === '') throw new AppError(codes.badRequest, messages.emptyPassword);
  if (!password) throw new AppError(codes.badRequest, messages.missingPassword);
  if (password.length < min) throw new AppError(codes.badRequest, messages.shortPassword);
};

const verifyCreateUserData = async (displayName, email, password) => {
  validateDisplayName(displayName, 8);
  validatePassword(password, 6);
  validateEmail(email);
  if (await emailConflict(email)) throw new AppError(codes.conflict, messages.emailConflict);
};

const verifyLoginData = async (email, password) => {
  validateEmail(email);
  validatePassword(password);

  const user = await UserModel.findOne({ where: { email } });

  if (!user || user.password !== password) {
    throw new AppError(codes.badRequest, messages.invalidFields);
  }
};

const verifyCategoryName = (name) => {
  if (!name) throw new AppError(codes.badRequest, messages.missingName);
};

const verifyCategoryExistence = async (categoryIds) => {
  const allCategories = await CategoryModel.findAll();
  // console.log('allCategories', allCategories);
  const existingIds = allCategories.map((categorie) => categorie.id);
  // console.log('categoryIds', categoryIds);
  // console.log('existingIds', existingIds);
  const allExists = categoryIds.every((id) => existingIds.includes(id));
  // console.log('allExists', allExists);
  return allExists;
};

const verifyPostData = async (title, content, categoryIds) => {
  if (!title) throw new AppError(codes.badRequest, messages.missingTitle);
  if (!content) throw new AppError(codes.badRequest, messages.missingContent);
  if (!categoryIds) throw new AppError(codes.badRequest, messages.missingCategories);
  const allExists = await verifyCategoryExistence(categoryIds);
  if (!allExists) {
    throw new AppError(codes.badRequest, messages.categoryNotFound);
  }
};

module.exports = {
  verifyCreateUserData,
  verifyCategoryName,
  verifyPostData,
  verifyLoginData,
};
