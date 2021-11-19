const { Category } = require('../../models');
const erroMessage = require('../errosCode/erroMessage');

const err = (statusCode) => ({ statusCode });

const titleNotExist = (title) => {
  if (!title) throw err(erroMessage.TITLE_NOT_EXIST);
};

const contentNotExist = (content) => {
  if (!content) throw err(erroMessage.CONTENT_NOT_EXIST);
};

const categoryIdNotExist = (categoryIds) => {
  if (!categoryIds) throw err(erroMessage.CATEGORYID_NOT_EXIST);
};

const categoryIdNotFound = async (categoryIds) => {
  const response = await Category.findAll({ where: { id: categoryIds } });
  if (response.length !== categoryIds.length) throw err(erroMessage.CATEGORYID_NOT_FOUND);
};

module.exports = { titleNotExist, contentNotExist, categoryIdNotExist, categoryIdNotFound };
