const { Category: CategoryModel } = require('../models');
const validations = require('../util/validations');
// const removeUserPass = require('../util/removeUserPass');
// const AppError = require('../util/appError');

// const codes = require('../util/httpCodes');
// const messages = require('../util/errorMessages');

const createCategory = async (name) => {
  await validations.verifyCategoryName(name);

  const category = await CategoryModel.create({ name });

  return category;
};

// const getUsers = async () => {
//   const users = await UserModel.findAll();

//   const usersWithoutPass = users.map((user) => removeUserPass(user));

//   return usersWithoutPass;
// };

module.exports = {
  createCategory,
};