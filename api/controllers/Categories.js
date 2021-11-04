const { StatusCodes } = require('http-status-codes');

const Categories = require('../services/Categories');

const addNewCategory = async (req, res, next) => {
  const { name } = req.body;

  const addedCategory = await Categories.addNewCategory(name);
  if (addedCategory.errMsg) {
    return next({ codeErr: addedCategory.codeErr, errMsg: addedCategory.errMsg });
  }

  res.status(StatusCodes.CREATED).json(addedCategory);
};

const getAllCategories = async (req, res, next) => {
  const allCategories = await Categories.getAllCategories();
  if (allCategories.errMsg) return next({ errMsg: allCategories.errMsg });

  res.status(StatusCodes.OK).json(allCategories);
};

// const getUserById = async (req, res, next) => {
//   const { id } = req.params;

//   const user = await User.getUserById(id);
//   if (user.errMsg) {
//     return next({ codeErr: user.codeErr, errMsg: user.errMsg });
//   }

//   res.status(StatusCodes.OK).json(user);
// };

module.exports = {
  addNewCategory,
  getAllCategories,
  // getUserById,
};
