const { Categorie, BlogPost } = require('../models');
const valid = require('../validations/BlogPost');

const create = async (post, categoryIds) => {
  await valid.checkCategoryIds(categoryIds, Categorie);
  const newPost = await BlogPost.create({ ...post });
  return newPost.dataValues;
}; 

module.exports = {
  create,
};
