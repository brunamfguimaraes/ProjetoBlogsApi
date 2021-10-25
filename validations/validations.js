const { User, Category } = require('../models');

const validateEmail = (email) => {
  const regexEmail = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/;
  if (!regexEmail.test(email)) {
      return false;
  }

  return true;
};

const existEmail = async (entryEmail) => {
  const existingEmail = await User.findOne({ where: { email: entryEmail } });
  if (existingEmail) { return { message: 'User already registered' }; }
  return true;
};

const findUser = async ({ email, password }) => {
  const userFound = await User.findOne({ where: { email, password } });
  if (!userFound) return false;
  return true;
};

const findCategory = async (categoryIds) => {
  const categoryId = await categoryIds.map(async (id) => {
    const result = await Category.findByPk(id);
    return result;
  });
  // espera todas as iterações ocorrerem
  const awaitPromise = await Promise.all(categoryId);

  const verifyPromise = awaitPromise.some((element) => !element);

  if (verifyPromise) {
    return { message: '"categoryIds" not found' }; 
 }
 return true;
};

module.exports = {
  validateEmail,
  existEmail,
  findUser,
  findCategory,
};