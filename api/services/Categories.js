const { Category } = require('../../models/index');

const BAD_REQUEST = 'bad_request';

const addNewCategory = async (name) => {
  if (!name) {
    return { codeErr: BAD_REQUEST, errMsg: '"name" is required' };
  }

  try {
    const category = await Category.create({ name });

    return category;
  } catch (error) {
    return { errMsg: error.message };
  }
};

module.exports = {
  addNewCategory,
};
