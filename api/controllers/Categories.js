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

module.exports = {
  addNewCategory,
};
