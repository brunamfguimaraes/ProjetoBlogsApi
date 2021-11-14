const { BlogPosts, Categories, User } = require('../models');

const { validateBlogPosts, validateUpdatePosts } = require('../validations/index');

const createBlogPost = async (title, content, categoryId) => {
  const blogPostIsValid = validateBlogPosts(title, content, categoryId);
  if (blogPostIsValid.message) return blogPostIsValid;

  const verifyCategory = await Categories.findOne({ where: { id: categoryId } });
  // console.log(categoryId);
  if (!verifyCategory) return { message: '"categoryIds" not found' };

  const published = new Date();
  const updated = published;

  const newPost = await BlogPosts
  .create({ title, content, categoryId, published, updated });

  return newPost;
};

const findAllBlogPosts = async () => {
  const findAll = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return findAll;
};

const findById = async (id) => {
  const findBlogPost = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (findBlogPost === [] || !findBlogPost) return { message: 'Post does not exist' };

  return findBlogPost;
};

const updatePost = async (id, data, userId) => {
  const blogUpdateIsValid = validateUpdatePosts(data.title, data.content, data.categoryIds);
  if (blogUpdateIsValid.message) return blogUpdateIsValid;
  
  const updateBlogPost = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (updateBlogPost.userId !== userId) return { message: 'Unauthorized user' };
  
  updateBlogPost.title = data.title;
  updateBlogPost.content = data.content;
  updateBlogPost.updated = new Date();

  const updatedPost = await updateBlogPost.save();

  return updatedPost;
};

const deletePost = async (id, userId) => {
  const deleteBP = await BlogPosts.findOne({ where: { id } });

  if (!deleteBP) return { message: 'Post does not exist' };
  if (deleteBP.userId !== userId) return { message: 'Unauthorized user' };
  
  deleteBP.destroy();

  return deleteBP;
};

module.exports = {
  createBlogPost,
  findAllBlogPosts,
  findById,
  updatePost,
  deletePost,
};