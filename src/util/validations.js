const { User: UserModel } = require('../models');
const AppError = require('./appError');
const codes = require('./httpCodes');
const messages = require('./errorMessages');

const rightEmailFormat = (email) => {
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(email);
  return isValid;
};

const validateDisplayName = (displayName, min) => {
  if (displayName.length < min) throw new AppError(codes.badRequest, messages.shortDisplayName);
};

const emailConflict = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  return user;
};

const validateEmail = async (email) => {
  if (!email) throw new AppError(codes.badRequest, messages.missingEmail);
  if (!rightEmailFormat(email)) throw new AppError(codes.badRequest, messages.wrongEmailFormat);
  if (await emailConflict(email)) throw new AppError(codes.conflict, messages.emailConflict);
};

const validatePassword = (password, min) => {
  if (!password) throw new AppError(codes.badRequest, messages.missingPassword);
  if (password.length < min) throw new AppError(codes.badRequest, messages.shortPassword);
};

const verifyCreateUserData = async (displayName, email, password) => {
  validateDisplayName(displayName, 8);
  validatePassword(password, 6);
  await validateEmail(email);
};

module.exports = {
  verifyCreateUserData,
};