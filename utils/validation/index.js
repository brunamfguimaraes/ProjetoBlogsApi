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

const blogExistById = (data) => {
  post.existById(data);
};

const updatePost = async (id, { title, content, categoryIds }, userInfo) => {
  post.titleNotExist(title);
  post.contentNotExist(content);
  post.categoryIdsNotEdited(categoryIds);
  await post.unauthorizedUser(id, userInfo);
};

const deletePost = async (id, userInfo) => {
  await post.unauthorizedUser(id, userInfo);
};

module.exports = {
  createUser,
  login,
  userExistById,
  createCategorie,
  createPost,
  blogExistById,
  updatePost,
  deletePost,
};
