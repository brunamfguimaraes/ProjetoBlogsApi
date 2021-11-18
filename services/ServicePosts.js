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

const getAll = async () => {
  const getAllBlogPost = await RepositoryPosts.getAll();

  return getAllBlogPost;
};

const getPostById = async (id) => {
  const post = await RepositoryPosts.getPostById(id);

  if (!post) throw invalidData('Post does not exist', StatusCodes.NOT_FOUND);

  return post;
};

const updatePost = async ({ title, content }, id, userId) => {
  const verifyUserId = await RepositoryPosts.getPostById(id);

  if (verifyUserId.userId !== userId) {
    throw invalidData('Unauthorized user', StatusCodes.UNAUTHORIZED);
  }

  const upatedPost = await RepositoryPosts.updatePost({ title, content }, id);

  return upatedPost;
};

const deletePost = async (id, userId) => {
  const post = await RepositoryPosts.getPostById(id);

  if (!post) throw invalidData('Post does not exist', StatusCodes.NOT_FOUND);

  const verifyUserId = await RepositoryPosts.getPostById(id);

  if (verifyUserId.userId !== userId) {
    throw invalidData('Unauthorized user', StatusCodes.UNAUTHORIZED);
  }

  await RepositoryPosts.deletePost(id);
};

const getPostsWithSearchTerm = async (searchTerm) => {
  if (!searchTerm) {
    const getAllBlogPost = await RepositoryPosts.getAll();

    return getAllBlogPost;
  }

  const posts = await RepositoryPosts.getPostsWithSearchTerm(searchTerm);

  return posts;
};

module.exports = {
  create,
  getAll,
  getPostById,
  updatePost,
  deletePost,
  getPostsWithSearchTerm,
}; 