const { BlogPost, User, Category } = require('../models');
const {
  checkPostEntries,
  checkCategories,
  checkUpdateEntries } = require('../validations/blogPostValidation');

const createPost = async (postData) => {
  const entries = checkPostEntries(postData);
  if (entries.message) return entries;

  const categoryIsNull = await checkCategories(postData.categoryIds);

  if (categoryIsNull) {
    return { message: '"categoryIds" not found' };
  }
  const { title, userId, content } = postData;

  return BlogPost.create({ title, userId, content });
}; 

const getAllPosts = async () => BlogPost.findAll(
    { 
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ], 
    },
);

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ], 
  }); 

  if (!post) return { message: 'Post does not exist' };

  return post; 
};

const updatePost = async ({ title, content, postId, userId, categoryIds }) => {
  if (categoryIds) return { message: 'Categories cannot be edited' };

  const entries = checkUpdateEntries({ title, content });
  if (entries.message) return entries;

  const post = await BlogPost.findByPk(postId);
  if (post.userId !== userId) return { message: 'Unauthorized user', unauthorized: true };

   await BlogPost.update(
    { title, content, updated: Date.now() }, { where: { id: postId, userId } },
  );
  
  return getPostById(postId);
};

const removePost = async ({ userId, postId }) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) return { message: 'Post does not exist' };
  if (post.userId !== userId) return { message: 'Unauthorized user', unauthorized: true };

  return BlogPost.destroy({ where: { id: postId } });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
};