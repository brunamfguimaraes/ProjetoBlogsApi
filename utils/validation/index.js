const user = require('./userValidation');
const categorie = require('./categoriesValidation');
const post = require('./postValidation');

const createUser = async (displayName, email, password) => {
  user.displayNameUser(displayName);
  user.emailExist(email);
  user.emailIsValid(email);
  user.passwordExist(password);
  user.passwordIsValid(password);
  await user.userExist(email);
};

const login = async (email, password) => {
  user.emailNotEmpty(email);
  user.emailExist(email);
  user.passwordNotEmpty(password);
  user.passwordExist(password);
  const data = await user.loginInvalid(email, password);
  return data;
};

const userExistById = (data) => {
  user.existById(data);
};

const createCategorie = (name) => {
  categorie.nameNotExist(name);
};

const createPost = async (title, content, categoryIds) => {
  post.titleNotExist(title);
  post.contentNotExist(content);
  post.categoryIdNotExist(categoryIds);
  await post.categoryIdNotFound(categoryIds);
};

module.exports = { createUser, login, userExistById, createCategorie, createPost };
