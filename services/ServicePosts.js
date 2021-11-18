const { StatusCodes } = require('http-status-codes');

const RepositoryPosts = require('../repository/RepositoryPosts');
const RepositoryCategories = require('../repository/RepositoryCategories');
const invalidData = require('../utils/invalidData');

const create = async ({ title, content, categoryIds }, userId) => {
  const getCategories = await RepositoryCategories.findCategories(categoryIds);

  if (getCategories.length !== categoryIds.length) {
    throw invalidData('"categoryIds" not found', StatusCodes.BAD_REQUEST);
  }

  const newBlogPost = await RepositoryPosts.create({ title, content }, userId);

  return newBlogPost;
};

module.exports = {
  create,
}; 