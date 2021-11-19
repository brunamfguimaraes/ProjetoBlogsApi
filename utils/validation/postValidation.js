const { Category, BlogPost } = require('../../models');
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

const existById = (data) => {
  if (!data) throw err(erroMessage.POST_NOT_EXIT);
};

const categoryIdsNotEdited = (categoryIds) => {
  if (categoryIds) throw err(erroMessage.CATEGORYID_NOT_EDITED);
};

const unauthorizedUser = async (id, userInfo) => {
  const data = await BlogPost.findByPk(id);
  if (!data) throw err(erroMessage.POST_NOT_EXIT);
  if (userInfo.id !== data.userId) throw err(erroMessage.UNAUTHORIZED_USER);
};

module.exports = {
  titleNotExist,
  contentNotExist,
  categoryIdNotExist,
  categoryIdNotFound,
  existById,
  categoryIdsNotEdited,
  unauthorizedUser,
};
